"use client";

import { BlockType } from "@/common/types";
import { nanoid } from "nanoid";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { useFocusBlock } from "./FocusBlockContext";
import { isTextBlock } from "@/common/utils";

export interface BlockState {
  blocks: EditorBlock[];
  added: Set<string>;
  updated: Set<string>;
  deleted: Set<string>;
}

interface BlockEditorContextType {
  blockState: BlockState;
  addBlock: (blockType: BlockType, currentBlockId?: string) => string;
  removeBlock: (_id: string) => void;
  updateBlock: (_id: string, _data: Partial<EditorBlock>) => void;
  reorderBlocks: (_oldIndex: number, _newIndex: number) => void;
  splitToNewBlock: (
    _id: string,
    _beforeContent: string,
    _afterContent: string
  ) => string;
  mergeWithPrevBlock: (_id: string) => void;
  getPrevTextBlock: (_id: string) => EditorBlock | null;
  getNextTextBlock: (_id: string) => EditorBlock | null;
  getReorderedBlockIds: () => string[];
  trimContent: (_blocks: EditorBlock[]) => EditorBlock[];
}

export interface EditorBlock {
  id: string;
  type: BlockType;
  payload: Payload;
}

export interface Payload {
  content: string;
  file?: File;
}

const BlockEditorContext = createContext<BlockEditorContextType | undefined>(
  undefined
);

type ProviderProps = {
  initial: EditorBlock[];
  postKey: string;
  children: React.ReactNode;
};

export function BlockEditorProvider({
  initial,
  postKey,
  children,
}: ProviderProps) {
  const defaults = useMemo(
    () => ({
      blocks: initial,
      added: new Set<string>(),
      updated: new Set<string>(),
      deleted: new Set<string>(),
    }),
    [postKey]
  );
  const [blockState, setBlockState] = useState<BlockState>(defaults);

  const { setFocusedBlockId } = useFocusBlock();

  const addBlock = (blockType: BlockType, currentBlockId?: string): string => {
    const newBlockId = nanoid();
    const newBlock: EditorBlock = {
      id: newBlockId,
      type: blockType,
      payload: { content: "" },
    };
    setBlockState((prev) => {
      const currentBlockIdx = prev.blocks.findIndex(
        (b) => b.id === currentBlockId
      );
      const idx =
        currentBlockIdx === -1 ? prev.blocks.length : currentBlockIdx + 1;

      return {
        ...blockState,
        blocks: [
          ...prev.blocks.slice(0, idx),
          newBlock,
          ...prev.blocks.slice(idx),
        ],
        // add id of added block
        added: new Set([...prev.added, newBlockId]),
        // TODO: add id of reordered block
      };
    });
    setFocusedBlockId(newBlockId);
    return newBlockId;
  };

  const removeBlock = (id: string) => {
    setBlockState((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((block) => block.id !== id),
      // deleted id of added block
      deleted: prev.added.has(id)
        ? prev.deleted
        : new Set([...prev.deleted, id]),
    }));
  };

  const updateBlock = (id: string, block: Partial<EditorBlock>) => {
    setBlockState((prev) => ({
      ...prev,
      blocks: prev.blocks.map((prevBlock) =>
        prevBlock.id === id ? { ...prevBlock, ...block } : prevBlock
      ),
      // add id of updated block
      updated: prev.added.has(id)
        ? prev.updated
        : new Set([...prev.updated, id]),
    }));
  };

  const reorderBlocks = useCallback((oldIndex: number, newIndex: number) => {
    setBlockState((prev) => {
      const newBlocks = arrayMove(prev.blocks, oldIndex, newIndex);
      return {
        ...prev,
        blocks: newBlocks,
        // TODO: add id of reordered block
      };
    });
  }, []);

  const mergeWithPrevBlock = (id: string) => {
    const curIdx = blockState.blocks.findIndex((b) => b.id === id);
    if (curIdx <= 0) return;

    const prevBlock = blockState.blocks[curIdx - 1];
    const curBlock = blockState.blocks[curIdx];
    const newBlock = {
      ...prevBlock,
      payload: {
        ...prevBlock.payload,
        content: prevBlock.payload.content + curBlock.payload.content,
      },
    };

    setBlockState((prev) => {
      const next = [...prev.blocks];
      next[curIdx - 1] = newBlock;
      next.splice(curIdx, 1);
      return {
        ...prev,
        blocks: next,
        // add id of updated block
        updated: prev.added.has(id)
          ? prev.updated
          : new Set([...prev.updated, prevBlock.id]),
        // add id of deleted block
        deleted: prev.added.has(id)
          ? prev.deleted
          : new Set([...prev.deleted, curBlock.id]),
        // TODO: add id of reordered block
      };
    });
  };

  const splitToNewBlock = (
    id: string,
    beforeContent: string,
    afterContent: string
  ): string => {
    const idx = blockState.blocks.findIndex((b) => b.id === id);
    if (idx === -1) return id;

    const beforeBlock: EditorBlock = {
      ...blockState.blocks[idx],
      payload: { content: beforeContent },
    };
    const afterBlock: EditorBlock = {
      id: nanoid(),
      type: "PARAGRAPH",
      payload: { content: afterContent },
    };

    setBlockState((prev) => {
      return {
        ...prev,
        blocks: [
          ...prev.blocks.slice(0, idx),
          beforeBlock,
          afterBlock,
          ...prev.blocks.slice(idx + 1),
        ],
        // add id of added block
        added: new Set([...prev.added, afterBlock.id]),
        // add id of updated block
        updated: prev.added.has(beforeBlock.id)
          ? prev.updated
          : new Set([...prev.updated, beforeBlock.id]),
      };
    });
    return afterBlock.id;
  };

  const getPrevTextBlock = (id: string): EditorBlock | null => {
    const idx = blockState.blocks.findIndex((block) => block.id === id);
    if (idx === -1) return null;
    for (let i = idx - 1; i >= 0; i--) {
      if (isTextBlock(blockState.blocks[i].type)) {
        return blockState.blocks[i];
      }
    }
    return null;
  };

  const getNextTextBlock = (id: string): EditorBlock | null => {
    const idx = blockState.blocks.findIndex((block) => block.id === id);
    if (idx === -1) return null;
    for (let i = idx + 1; i < blockState.blocks.length; i++) {
      if (isTextBlock(blockState.blocks[i].type)) {
        return blockState.blocks[i];
      }
    }
    return null;
  };

  const getReorderedBlockIds = () => {
    return blockState.blocks
      .filter(
        (block, idx) =>
          (idx >= defaults.blocks.length ||
            defaults.blocks[idx].id !== block.id) &&
          !blockState.added.has(block.id)
      )
      .map((block) => block.id);
  };

  const trimContent = (targetBlocks: EditorBlock[]): EditorBlock[] => {
    let i = 0;
    for (; i < targetBlocks.length; i++) {
      const block = targetBlocks[targetBlocks.length - i - 1];
      if (block.payload.content.length > 0 || block.payload.file) {
        break;
      }
    }
    return targetBlocks.slice(0, blockState.blocks.length + i * -1);
  };

  const value = useMemo(
    () => ({
      blockState,
      addBlock,
      removeBlock,
      updateBlock,
      reorderBlocks,
      mergeWithPrevBlock,
      splitToNewBlock,
      getPrevTextBlock,
      getNextTextBlock,
      getReorderedBlockIds,
      trimContent,
    }),
    [blockState]
  );

  return (
    <BlockEditorContext.Provider value={value}>
      {children}
    </BlockEditorContext.Provider>
  );
}

export function useBlockEditor() {
  const ctx = useContext(BlockEditorContext);
  if (!ctx)
    throw new Error("useBlockEditor must be inside BlockEditorProvider");
  return ctx;
}
