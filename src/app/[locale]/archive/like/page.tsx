"use client";

import TagSearchBar from "@/components/archive/TagSearchBar";
import { useAuth } from "@/contexts/AuthContext";
import InfiniteScroll from "@/components/common/InfiniteScroll";
import { useEffect, useRef, useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import {
  ArchiveSummaryResponse,
  ListBookmarkArchives,
  useListBookmarkArchivesQuery,
} from "@/hooks/api/archive/archive";
import MainCard from "@/components/archive/MainCard";
import { ListTag, useListTagsQuery } from "@/hooks/api/archive/tag";

export default function LinkPage() {
  const { isAuthenticated } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [payloads, setPayloads] = useState<ArchiveSummaryResponse[]>();

  useRequireAuth();

  const result = useListBookmarkArchivesQuery({
    url: ListBookmarkArchives.url(),
    key: ListBookmarkArchives.key(),
    params: { type: "REFERENCE" },
    options: { enabled: isAuthenticated, staleTime: 5 * 60 * 1000 },
  });

  const { data: tags } = useListTagsQuery({
    url: ListTag.url(),
    key: ListTag.key(),
    options: { enabled: isAuthenticated },
  });

  useEffect(() => {
    if (!result.data) return;
    if (!selectedTag) {
      const filteredPayloads = result.data.pages.flatMap(
        (page) => page.content
      );
      setPayloads(filteredPayloads);
      return;
    }
    const filteredPayloads =
      result.data.pages
        .flatMap((page) => page.content)
        .filter((content) => content.tags.includes(selectedTag)) ?? [];
    setPayloads(filteredPayloads);
  }, [selectedTag, result.data]);

  return (
    <div
      ref={scrollRef}
      className="relative h-full w-full flex flex-row justify-start p-8"
    >
      <section className="flex flex-row justify-between items-start h-full w-full max-w-7xl">
        <div className="flex flex-col gap-20 w-full">
          {tags && (
            <TagSearchBar
              tags={tags.content}
              onClick={(v) => setSelectedTag(v)}
              selectedTag={selectedTag}
            />
          )}
          <InfiniteScroll
            result={result}
            root={scrollRef}
            payloads={payloads}
            className="flex flex-wrap gap-8 justify-start"
          >
            {(note) => (
              <div className="flex justify-center" key={note.id}>
                <MainCard
                  id={note.id}
                  title={note.title}
                  thumbnailPath={note.thumbnailPath}
                  writer={note.writer}
                />
              </div>
            )}
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}
