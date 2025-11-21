"use client";

import { Button } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useRouter } from "@/i18n/routing";
import { EditorBlock, useBlockEditor } from "@/contexts/BlockEditorContext";
import { EditorState, useEditor } from "@/contexts/EditorContext";

export interface UpdateEditorState extends Partial<EditorState> {
  blocks: EditorBlock[];
  isThumbnailDeleted: boolean;
  deletedBlockIds: string[];
  updatedBlockIds: string[];
  addedBlockIds: string[];
  reorderedBlockIds: string[];
}

interface EditorFooterProps {
  placeholder: string;
  onSave?: (data: EditorState) => void;
  onUpdate?: (data: UpdateEditorState) => void;
}

export default function EditorFooter({
  placeholder,
  onSave,
  onUpdate,
}: EditorFooterProps) {
  const router = useRouter();
  const { state, getDirty: getDirtyMeta } = useEditor();
  const { blockState, trimContent, getReorderedBlockIds } = useBlockEditor();
  const { blocks, deleted, updated, added } = blockState;
  const dataOnsave = () => ({
    ...state,
    title: state.title.trim(),
    blocks: trimContent(blocks),
  });
  const dataOnUpdate = () => {
    const dirtyMeta = getDirtyMeta();
    return {
      ...dirtyMeta,
      isThumbnailDeleted: dirtyMeta.thumbnail === null,
      title: dirtyMeta.title?.trim(),
      blocks: trimContent(blocks),
      deletedBlockIds: [...deleted],
      updatedBlockIds: [...updated],
      addedBlockIds: [...added],
      reorderedBlockIds: getReorderedBlockIds(),
      type: state.type,
    };
  };

  return (
    <div className=" flex justify-center bg-muted w-full items-center p-2">
      <div className="flex flex-row items-center justify-center cursor-pointer rounded-xl">
        <Button
          onClick={() => router.back()}
          className={
            "flex flex-row items-center gap-2 w-30 py-1.5 px-6 rounded-xl cursor-pointer click-effect"
          }
        >
          <ArrowLeftIcon className="w-4 h-4 text-muted-foreground" />
          <p className="text-muted-foreground">나가기</p>
        </Button>
      </div>
      {(onSave || onUpdate) && (
        <div className="flex flex-row items-center justify-center cursor-pointer rounded-xl">
          <Button
            className={
              "w-30 py-1.5 px-6 rounded-xl cursor-pointer click-effect"
            }
            onClick={() => {
              if (state.mode === "create") onSave?.(dataOnsave());
              if (state.mode === "edit") onUpdate?.(dataOnUpdate());
            }}
          >
            <p className="text-foreground">{placeholder}</p>
          </Button>
        </div>
      )}
    </div>
  );
}
