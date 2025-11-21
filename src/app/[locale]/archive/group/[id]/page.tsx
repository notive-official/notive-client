"use client";

import TagSearchBar from "@/components/archive/TagSearchBar";
import { useAuth } from "@/contexts/AuthContext";
import InfiniteScroll from "@/components/common/InfiniteScroll";
import { use, useEffect, useRef, useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import MainCard from "@/components/archive/MainCard";
import {
  useListArchivesByGroupQuery,
  ListArchivesByGroup,
  ArchiveSummaryResponse,
  useGetGroupMetaQuery,
  getGroupMeta,
  usePutGroupMutation,
  PutGroup,
} from "@/hooks/api/archive/group";
import { Button } from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/20/solid";
import InputBox from "@/components/common/InputBox";
import { useQueryClient } from "@tanstack/react-query";

type GroupArchiveProps = { id: string };

export default function GroupArchivePage({
  params,
}: {
  params: Promise<GroupArchiveProps>;
}) {
  const { id } = use(params);
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedTag, setSelectedTad] = useState<string>();
  const [payloads, setPayloads] = useState<ArchiveSummaryResponse[]>();

  useRequireAuth();
  const result = useListArchivesByGroupQuery({
    url: ListArchivesByGroup.url(id),
    key: ListArchivesByGroup.key(id),
    options: { enabled: isAuthenticated, staleTime: 5 * 60 * 1000 },
  });

  const { data: groupMeta } = useGetGroupMetaQuery({
    url: getGroupMeta.url(id),
    key: getGroupMeta.key(id),
    options: { enabled: isAuthenticated, staleTime: 5 * 60 * 1000 },
  });
  const { mutate: changeGroupName } = usePutGroupMutation({
    url: PutGroup.url(id),
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGroupMeta.key(id),
        });
      },
    },
  });
  const [groupName, setGroupName] = useState<string>(groupMeta?.name ?? "");
  const [isGroupNameChanging, setIsGroupNameChanging] =
    useState<boolean>(false);

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
      className="relative h-full w-full flex flex-col justify-start mx-auto overflow-y-auto p-8"
    >
      <section className="rounded-xl justify-start items-center h-fit w-full max-w-7xl">
        {!isGroupNameChanging ? (
          <div className="flex flex-row p-4 gap-2">
            <h1 className="text-2xl font-bold ">{groupMeta?.name}</h1>

            {/* 그룹 수정 버튼 */}
            <Button
              className="p-1 click-effect text-muted-foreground hover:text-foreground"
              onClick={() => {
                setGroupName(groupMeta?.name ?? "");
                setIsGroupNameChanging(true);
              }}
            >
              <PencilIcon className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <InputBox
            value={groupName}
            handleChange={(value) => setGroupName(value)}
            buttonIcon={<PencilIcon className="w-5 h-5" />}
            onAction={() => {
              changeGroupName({ groupName });
              setIsGroupNameChanging(false);
            }}
          />
        )}
      </section>
      <section className="flex flex-row justify-between items-start h-full w-full max-w-7xl">
        <div className="flex flex-col gap-20 w-full">
          <TagSearchBar
            onClick={(v) => setSelectedTad(v)}
            selectedTag={selectedTag}
          />
          <InfiniteScroll result={result} root={scrollRef} payloads={payloads}>
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
