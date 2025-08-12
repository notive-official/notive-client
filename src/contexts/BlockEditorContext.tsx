"use client";

import { BlockType } from "@/common/types";
import { nanoid } from "nanoid";
import React, { createContext, useContext, useState, useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { useFocusBlock } from "./FocusBlockContext";
import { isTextBlock } from "@/common/utils";

interface BlockEditorContextType {
  blocks: EditorBlock[];
  addNewBlock: (blockType: BlockType) => string;
  addNewBlockAfter: (currentBlockId: string, blockType: BlockType) => string;
  removeBlock: (_id: string) => void;
  updateBlock: (_id: string, _data: Partial<CommonBlock>) => void;
  changeBlockType: (_id: string, _type: BlockType) => void;
  reorderBlocks: (_oldIndex: number, _newIndex: number) => void;
  mergeWithPrevBlock: (_id: string) => void;
  getPrevTextBlock: (_id: string) => EditorBlock | null;
  getNextTextBlock: (_id: string) => EditorBlock | null;
  trimContent: (_blocks: EditorBlock[]) => EditorBlock[];
}

export interface EditorBlock {
  id: string;
  type: BlockType;
  payload: CommonBlock;
}

export interface CommonBlock {
  content: string;
  file?: File;
}

const BlockEditorContext = createContext<BlockEditorContextType | undefined>(
  undefined
);

export function BlockEditorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setFocusedBlockId } = useFocusBlock();
  const [blocks, setBlocks] = useState<EditorBlock[]>([]);

  const addNewBlock = (blockType: BlockType): string => {
    const newBlock: EditorBlock = {
      id: nanoid(),
      type: blockType,
      payload: { content: "" },
    };
    setBlocks([...blocks, newBlock]);
    setFocusedBlockId(newBlock.id);
    return newBlock.id;
  };

  const addNewBlockAfter = (
    currentBlockId: string,
    blockType: BlockType
  ): string => {
    const newBlockId = nanoid();
    setBlocks((prevBlocks) => {
      const idx = prevBlocks.findIndex((b) => b.id === currentBlockId);
      const newBlock: EditorBlock = {
        id: newBlockId,
        type: blockType,
        payload: { content: "" },
      };
      const newBlocks = [
        ...prevBlocks.slice(0, idx + 1),
        newBlock,
        ...prevBlocks.slice(idx + 1),
      ];
      return newBlocks;
    });
    setFocusedBlockId(newBlockId);
    return newBlockId;
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const changeBlockType = (id: string, blockType: BlockType) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, type: blockType } : block
      )
    );
  };

  const updateBlock = (id: string, payload: Partial<CommonBlock>) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id
          ? { ...block, payload: { ...block.payload, ...payload } }
          : block
      )
    );
  };

  const mergeWithPrevBlock = (id: string) => {
    setBlocks((prevBlocks) => {
      const currIdx = prevBlocks.findIndex((b) => b.id === id);
      if (currIdx <= 0) return prevBlocks;
      const prevBlock = prevBlocks[currIdx - 1];
      const currBlock = prevBlocks[currIdx];
      const newBlocks = [...prevBlocks];

      newBlocks[currIdx - 1] = {
        ...prevBlock,
        payload: {
          ...prevBlock.payload,
          content: prevBlock.payload.content + currBlock.payload.content,
        },
      };
      // 현재 블록 삭제
      newBlocks.splice(currIdx, 1);
      return newBlocks;
    });
  };

  const getPrevTextBlock = (id: string): EditorBlock | null => {
    const idx = blocks.findIndex((block) => block.id === id);
    if (idx === -1) return null;
    for (let i = idx - 1; i >= 0; i--) {
      if (isTextBlock(blocks[i].type)) {
        return blocks[i];
      }
    }
    return null;
  };

  const getNextTextBlock = (id: string): EditorBlock | null => {
    const idx = blocks.findIndex((block) => block.id === id);
    if (idx === -1) return null;
    for (let i = idx + 1; i < blocks.length; i++) {
      if (isTextBlock(blocks[i].type)) {
        return blocks[i];
      }
    }
    return null;
  };

  const reorderBlocks = useCallback((oldIndex: number, newIndex: number) => {
    setBlocks((prev) => arrayMove(prev, oldIndex, newIndex));
  }, []);

  const trimContent = (targetBlocks: EditorBlock[]): EditorBlock[] => {
    let i = 1;
    for (; i <= targetBlocks.length; i++) {
      const block = targetBlocks[targetBlocks.length - i];
      if (block.payload.content.length > 0 || block.payload.file) {
        break;
      }
    }
    return targetBlocks.slice(0, i * -1);
  };

  return (
    <BlockEditorContext.Provider
      value={{
        blocks,
        addNewBlock,
        addNewBlockAfter,
        removeBlock,
        updateBlock,
        changeBlockType,
        reorderBlocks,
        mergeWithPrevBlock,
        getPrevTextBlock,
        getNextTextBlock,
        trimContent,
      }}
    >
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
