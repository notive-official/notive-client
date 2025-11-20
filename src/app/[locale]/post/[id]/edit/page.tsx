"use client";

import { use } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArchiveDetail,
  useArchiveDetailQuery,
} from "@/hooks/api/archive/archive";
import Editor from "@/components/editor/Editor";
import EditorFooter, {
  UpdateEditorState,
} from "@/components/editor/EditorFooter";
import { EditorProvider } from "@/contexts/EditorContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useErrorBar } from "@/contexts/ErrorBarContext";
import { usePatchNote } from "@/hooks/api/archive/note";
import {
  PutReference,
  usePutReferenceMutation,
} from "@/hooks/api/archive/reference";
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "@/i18n/routing";
import { useQueryClient } from "@tanstack/react-query";

type ArchiveEditProps = { id: string };

export default function ArchiveEditPage({
  params,
}: {
  params: Promise<ArchiveEditProps>;
}) {
  useRequireAuth();
  const { id } = use(params);
  const { isLoading } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: archive } = useArchiveDetailQuery({
    url: ArchiveDetail.url(id),
    key: ArchiveDetail.key(id),
    options: {
      enabled: !isLoading,
    },
  });

  const { pushWarning } = useErrorBar();
  const { PostTrans } = useTranslation();
  const { patchNote } = usePatchNote();
  const { mutate: putReference } = usePutReferenceMutation({
    url: PutReference.url(id),
  });

  const onUpdate = (data: UpdateEditorState) => {
    if (data.title?.length === 0) {
      pushWarning(PostTrans("message.warning.title"));
      return;
    }

    const addedBlockIdxes: number[] = data.addedBlockIds
      .map((id) => data.blocks.findIndex((b) => b.id === id))
      .filter((block) => block !== -1);

    const updatedBlockIdxes: number[] = data.updatedBlockIds
      .map((id) => data.blocks.findIndex((b) => b.id === id))
      .filter((block) => block !== -1);

    const reorderedBlockIdxes: number[] = data.reorderedBlockIds
      .map((id) => data.blocks.findIndex((b) => b.id === id))
      .filter((block) => block !== -1);

    const body = {
      ...data,
      addedBlockIdxes,
      updatedBlockIdxes,
      reorderedBlockIdxes,
      deletedBlockIds: data.deletedBlockIds,
      groupId: data.group?.id,
      thumbnail: data.thumbnail?.file,
    };

    if (data.type === "NOTE") {
      if (data.blocks?.length === 0) {
        pushWarning(PostTrans("message.warning.content"));
        return;
      }

      return patchNote(id, body).then((res) => {
        queryClient.invalidateQueries({ queryKey: ArchiveDetail.key(id) });
        router.push(`/post/${res.data.id}`);
      });
    }

    if (data.type === "REFERENCE") {
      if (data.url && data.url.length === 0) {
        pushWarning(PostTrans("message.warning.url"));
      }
      console.log(data);
      return putReference(
        { ...data, url: data.url },
        {
          onSuccess(res) {
            queryClient.invalidateQueries({ queryKey: ArchiveDetail.key(id) });
            router.push(`/post/${res.id}`);
          },
        }
      );
    }
  };

  if (!archive)
    return (
      <div className="flex justify-center items-center h-full">로딩 중...</div>
    );

  const { meta } = archive;
  const init =
    meta.type === "REFERENCE"
      ? {
          url: archive.blocks[0].payload,
          blocks: [],
          thumbnail: null,
          tags: archive.tags,
        }
      : {
          url: "",
          blocks: archive.blocks
            .sort((a, b) => a.position - b.position)
            .map((block) => {
              const payload = { content: block.payload };
              return { id: block.id, type: block.type, payload };
            }),
          thumbnail: meta.thumbnailPath
            ? { path: meta.thumbnailPath, file: null }
            : null,
          tags: archive.tags,
        };

  return (
    <div className="relative h-screen">
      <EditorProvider
        initial={{
          ...meta,
          ...init,
          mode: "edit",
        }}
        postKey={id}
      >
        <div className="flex flex-col w-full h-full pb-32">
          <Editor />
        </div>
        <div className="fixed bottom-0 left-0 z-10 w-full">
          <EditorFooter placeholder="수정하기" onUpdate={onUpdate} />
        </div>
      </EditorProvider>
    </div>
  );
}
