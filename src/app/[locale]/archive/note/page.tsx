"use client";

import TagSearchBar from "@/components/archive/TagSearchBar";
import NoteCard from "@/components/archive/NoteCard";
import { useAuth } from "@/contexts/AuthContext";
import { ArchiveSummaryResponse, ListArchives, useListArchivesQuery } from "@/hooks/api/archive/archive";
import InfiniteScroll from "@/components/common/InfiniteScroll";
import { useEffect, useRef, useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { ListTag, useListTagsQuery } from "@/hooks/api/archive/tag";

export default function NotePage() {
  const { isAuthenticated } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [payloads, setPayloads] = useState<ArchiveSummaryResponse[]>();
  useRequireAuth();

  const result = useListArchivesQuery({ url: ListArchives.url(), key: ListArchives.key("NOTE"), params: { type: "NOTE" }, options: { enabled: isAuthenticated, staleTime: 5 * 60 * 1000 } });
  const { data: tags } = useListTagsQuery({ url: ListTag.url(), key: ListTag.key(), options: { enabled: isAuthenticated } });

  useEffect(() => {
    if (!result.data) return;
    const all = result.data.pages.flatMap((p) => p.content);
    setPayloads(!selectedTag ? all : all.filter((c) => c.tags.includes(selectedTag)));
  }, [selectedTag, result.data]);

  return (
    <div ref={scrollRef} className="h-full w-full p-5 md:p-8 overflow-y-auto">
      <div className="flex flex-col gap-6 max-w-3xl">
        <h1 className="text-xl font-semibold text-foreground">Note</h1>
        {tags && tags.content.length > 0 && <TagSearchBar tags={tags.content} onClick={(v) => setSelectedTag(v)} selectedTag={selectedTag} />}
        <InfiniteScroll result={result} root={scrollRef} payloads={payloads} className="flex flex-col gap-3">
          {(n) => <NoteCard key={n.id} id={n.id} title={n.title} thumbnailPath={n.thumbnailPath} writer={n.writer} content={n.summary} />}
        </InfiniteScroll>
      </div>
    </div>
  );
}
