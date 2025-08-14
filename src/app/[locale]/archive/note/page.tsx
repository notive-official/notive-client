"use client";

import TagSearchBar from "@/components/archive/TagSearchBar";
import NoteCard from "@/components/archive/NoteCard";
import { useAuth } from "@/contexts/AuthContext";
import { useListNotesQuery } from "@/hooks/api/archive/note";
import InfiniteScroll from "@/components/common/InfiniteScroll";
import { useRef, useState } from "react";

export default function NotePage() {
  const { isAuthenticated } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tags, setTags] = useState<string[]>([]);

  const result = useListNotesQuery(
    {},
    { enabled: isAuthenticated, staleTime: 10 * 60 * 1000 }
  );

  return (
    <div
      ref={scrollRef}
      className="relative h-full w-full flex flex-row justify-start mx-auto overflow-y-auto p-8"
    >
      <section className="flex flex-row justify-between items-start h-full w-full max-w-7xl">
        <div className="flex flex-col gap-20 w-full">
          <TagSearchBar />
          <InfiniteScroll result={result} root={scrollRef}>
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
