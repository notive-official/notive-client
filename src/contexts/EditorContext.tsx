"use client";

import { BlockType } from "@/common/types";
import useTag from "@/hooks/tag";
import { nanoid } from "nanoid";
import React, { createContext, useContext, useState, useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { useFocusBlock } from "./FocusBlockContext";
import { isTextBlock } from "@/common/utils";

interface EditorContextType {
  title: string;
  tags: string[];
  blocks: EditorBlock[];
  changeTitle: (_title: string) => void;
  addTag: (_tag: string) => void;
  removeTag: (_tag: string) => void;
  addNewBlock: (blockType: BlockType) => string;
  addNewBlockAfter: (currentBlockId: string, blockType: BlockType) => string;
  removeBlock: (_id: string) => void;
  updateBlock: (_id: string, _data: Partial<CommonBlock>) => void;
  changeBlockType: (_id: string, _type: BlockType) => void;
  reorderBlocks: (_oldIndex: number, _newIndex: number) => void;
  mergeWithPrevBlock: (_id: string) => void;
  getPrevTextBlock: (_id: string) => EditorBlock | null;
  getNextTextBlock: (_id: string) => EditorBlock | null;
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

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const { setFocusedBlockId } = useFocusBlock();
  const [title, setTitle] = useState("");
  const { tags, addTag, removeTag } = useTag();
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
      // 이전 블록에 현재 블록 내용 합치기
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

  return (
    <EditorContext.Provider
      value={{
        title,
        tags,
        blocks,
        changeTitle: setTitle,
        addTag,
        removeTag,
        addNewBlock,
        addNewBlockAfter,
        removeBlock,
        updateBlock,
        changeBlockType,
        reorderBlocks,
        mergeWithPrevBlock,
        getPrevTextBlock,
        getNextTextBlock,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be inside EditorProvider");
  return ctx;
}
