"use client";

import { Button } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useRouter } from "@/i18n/routing";
import { useBlockEditor } from "@/contexts/BlockEditorContext";
import { useEditor } from "@/contexts/EditorContext";
import { useQueryClient } from "@tanstack/react-query";
import { listGroupDetailsKey } from "@/hooks/api/archive/group";
import { useErrorBar } from "@/contexts/ErrorBarContext";
import useTranslation from "@/hooks/useTranslation";
import { listNotesKey, usePostNote } from "@/hooks/api/archive/note";
import { listArchivesKey } from "@/hooks/api/search";
import { ListTag } from "@/hooks/api/archive/tag";

export default function EditorFooter() {
  const router = useRouter();
  const { blocks } = useBlockEditor();
  const { title, tags, group, isPublic, archiveType, isReplicable, thumbnail } =
    useEditor();
  const { trimContent } = useBlockEditor();
  const queryClient = useQueryClient();
  const { pushWarning } = useErrorBar();
  const { PostTrans } = useTranslation();
  const { postNote } = usePostNote();

  const onSave = () => {
    const trimmedBlocks = trimContent(blocks);
    if (!group) {
      pushWarning(PostTrans("message.warning.group"));
      return;
    }
    if (title.trim().length === 0) {
      pushWarning(PostTrans("message.warning.title"));
      return;
    }
    if (trimmedBlocks.length === 0) {
      pushWarning(PostTrans("message.warning.content"));
      return;
    }

    const data = {
      blocks: trimmedBlocks,
      title,
      tags,
      groupId: group.id,
      isPublic,
      archiveType,
      isReplicable,
      thumbnail,
    };

    postNote(data).then((res) => {
      queryClient.invalidateQueries({
        queryKey: ListTag.key(),
      });
      queryClient.invalidateQueries({
        queryKey: [listGroupDetailsKey],
      });
      queryClient.invalidateQueries({
        queryKey: [listNotesKey, {}],
      });
      queryClient.invalidateQueries({
        queryKey: [listArchivesKey, {}],
      });
      router.replace(`/view/note/${res.data.id}`);
    });
  };

  return (
    <div className="fixed bottom-0 left-0 z-10 bg-reverse-100 w-full flex justify-center items-center p-2">
      <div className="cursor-pointer rounded-xl">
        <Button
          onClick={() => router.back()}
          className={
            "flex flex-row items-center gap-2 py-1.5 px-6 rounded-xl cursor-pointer click-effect"
          }
        >
          <ArrowLeftIcon className="w-4 h-4 text-muted-foreground" />
          <p className="text-muted-foreground">돌아가기</p>
        </Button>
      </div>
      <div className="cursor-pointer bg-secondary rounded-xl">
        <Button
          className={"py-1.5 px-6 rounded-xl cursor-pointer click-effect"}
          onClick={onSave}
        >
          <p className="text-foreground font-bold">저장</p>
        </Button>
      </div>
    </div>
  );
}
