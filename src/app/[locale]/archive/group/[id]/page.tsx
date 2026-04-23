"use client";

import TagSearchBar from "@/components/archive/TagSearchBar";
import { useAuth } from "@/contexts/AuthContext";
import InfiniteScroll from "@/components/common/InfiniteScroll";
import { use, useEffect, useRef, useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import MainCard from "@/components/archive/MainCard";
import { useListArchivesByGroupQuery, ListArchivesByGroup, ArchiveSummaryResponse, useGetGroupMetaQuery, getGroupMeta, usePutGroupMutation, PutGroup } from "@/hooks/api/archive/group";
import { Button } from "@headlessui/react";
import { PencilIcon, CheckIcon } from "@heroicons/react/24/outline";
import InputBox from "@/components/common/InputBox";
import { useQueryClient } from "@tanstack/react-query";
import { ListTag, useListTagsQuery } from "@/hooks/api/archive/tag";

export default function GroupArchivePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [payloads, setPayloads] = useState<ArchiveSummaryResponse[]>();
  useRequireAuth();

  const result = useListArchivesByGroupQuery({ url: ListArchivesByGroup.url(id), key: ListArchivesByGroup.key(id), options: { enabled: isAuthenticated, staleTime: 5 * 60 * 1000 } });
  const { data: groupMeta } = useGetGroupMetaQuery({ url: getGroupMeta.url(id), key: getGroupMeta.key(id), options: { enabled: isAuthenticated, staleTime: 5 * 60 * 1000 } });
  const { mutate: changeGroupName } = usePutGroupMutation({ url: PutGroup.url(id), options: { onSuccess: () => queryClient.invalidateQueries({ queryKey: getGroupMeta.key(id) }) } });
  const { data: tags } = useListTagsQuery({ url: ListTag.url(), key: ListTag.key(), options: { enabled: isAuthenticated } });

  const [groupName, setGroupName] = useState(groupMeta?.name ?? "");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!result.data) return;
    const all = result.data.pages.flatMap((p) => p.content);
    setPayloads(!selectedTag ? all : all.filter((c) => c.tags.includes(selectedTag)));
  }, [selectedTag, result.data]);

  return (
    <div ref={scrollRef} className="h-full w-full p-5 md:p-8 overflow-y-auto">
      <div className="flex flex-col gap-6 max-w-5xl">
        <div className="flex items-center gap-3">
          {!editing ? (
            <>
              <h1 className="text-xl font-semibold text-foreground">{groupMeta?.name}</h1>
              <Button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-reverse-5 cursor-pointer transition-all" onClick={() => { setGroupName(groupMeta?.name ?? ""); setEditing(true); }}>
                <PencilIcon className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <div className="w-full max-w-sm">
              <InputBox value={groupName} handleChange={setGroupName} buttonIcon={<CheckIcon className="w-5 h-5" />} onAction={() => { changeGroupName({ groupName }); setEditing(false); }} autoFocus />
            </div>
          )}
        </div>
        {tags && tags.content.length > 0 && <TagSearchBar tags={tags.content} onClick={(v) => setSelectedTag(v)} selectedTag={selectedTag} />}
        <InfiniteScroll result={result} root={scrollRef} payloads={payloads} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {(n) => <MainCard key={n.id} id={n.id} title={n.title} thumbnailPath={n.thumbnailPath} writer={n.writer} />}
        </InfiniteScroll>
      </div>
    </div>
  );
}
