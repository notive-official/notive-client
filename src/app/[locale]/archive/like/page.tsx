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

export default function LinkPage() {
  const { isAuthenticated } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedTag, setSelectedTad] = useState<string>();
  const [payloads, setPayloads] = useState<ArchiveSummaryResponse[]>();

  useRequireAuth();

  const result = useListBookmarkArchivesQuery({
    url: ListBookmarkArchives.url(),
    key: ListBookmarkArchives.key(),
    params: { type: "REFERENCE" },
    options: { enabled: isAuthenticated, staleTime: 5 * 60 * 1000 },
  });

  useEffect(() => {
    if (!selectedTag) return;
    if (!result.data) return;
    const filteredPayloads =
      result.data.pages
        .flatMap((page) => page.content)
        .filter((content) => content.tags.includes(selectedTag)) ?? [];
    setPayloads(filteredPayloads);
  }, [selectedTag, result.data]);

  return (
    <div
      ref={scrollRef}
      className="relative h-full w-full flex flex-row justify-start mx-auto overflow-y-auto p-8"
    >
      <section className="flex flex-row justify-between items-start h-full w-full max-w-7xl">
        <div className="flex flex-col gap-20 w-full">
          <TagSearchBar
            onClick={(v) => setSelectedTad(v)}
            selectedTag={selectedTag}
          />
          <InfiniteScroll
            result={result}
            root={scrollRef}
            payloads={payloads}
            className="flex flex-wrap gap-8 justify-center"
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
