"use client";

import TagSearchBar from "@/components/archive/TagSearchBar";
import NoteCard from "@/components/archive/NoteCard";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArchiveSummaryResponse,
  ListArchives,
  useListArchivesQuery,
} from "@/hooks/api/archive/archive";
import InfiniteScroll from "@/components/common/InfiniteScroll";
import { useEffect, useRef, useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function NotePage() {
  const { isAuthenticated } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [payloads, setPayloads] = useState<ArchiveSummaryResponse[]>();

  useRequireAuth();

  const result = useListArchivesQuery({
    url: ListArchives.url(),
    key: ListArchives.key("NOTE"),
    params: { type: "NOTE" },
    options: { enabled: isAuthenticated, staleTime: 5 * 60 * 1000 },
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
          <TagSearchBar
            onClick={(v) => setSelectedTag(v)}
            selectedTag={selectedTag}
          />
          <InfiniteScroll result={result} root={scrollRef} payloads={payloads}>
            {(note) => (
              <div className="flex justify-center" key={note.id}>
                <NoteCard
                  id={note.id}
                  title={note.title}
                  thumbnailPath={note.thumbnailPath}
                  writer={note.writer}
                  content={note.summary}
                />
              </div>
            )}
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}
