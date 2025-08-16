"use client";

import TagSearchBar from "@/components/archive/TagSearchBar";
import NoteCard from "@/components/archive/NoteCard";
import { useAuth } from "@/contexts/AuthContext";
import {
  NoteSummaryResponse,
  useListNotesQuery,
} from "@/hooks/api/archive/note";
import InfiniteScroll from "@/components/common/InfiniteScroll";
import { useEffect, useRef, useState } from "react";

export default function NotePage() {
  const { isAuthenticated } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedTag, setSelectedTad] = useState<string>();
  const [payloads, setPayloads] = useState<NoteSummaryResponse[]>();

  const result = useListNotesQuery(
    {},
    { enabled: isAuthenticated, staleTime: 5 * 60 * 1000 }
  );

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
          <InfiniteScroll result={result} root={scrollRef} payloads={payloads}>
            {(note) => (
              <div className="flex justify-center" key={note.id}>
                <NoteCard
                  id={note.id}
                  title={note.title}
                  thumbnailUrl={note.thumbnailPath}
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
