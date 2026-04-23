"use client";

import { Button } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
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

export default function EditorFooter({ placeholder, onSave, onUpdate }: EditorFooterProps) {
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
    <div className="sticky bottom-0 z-10 bg-surface border-t border-border">
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-3 flex items-center justify-between">
        <Button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-reverse-5 transition-all cursor-pointer"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          나가기
        </Button>

        {(onSave || onUpdate) && (
          <Button
            className="px-6 py-2 rounded-lg text-sm font-medium bg-foreground text-surface hover:opacity-90 transition-opacity cursor-pointer"
            onClick={() => {
              if (state.mode === "create") onSave?.(dataOnsave());
              if (state.mode === "edit") onUpdate?.(dataOnUpdate());
            }}
          >
            {placeholder}
          </Button>
        )}
      </div>
    </div>
  );
}
