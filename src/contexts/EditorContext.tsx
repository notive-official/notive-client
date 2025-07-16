"use client";

import { BlockType } from "@/common/types";
import useTag from "@/hooks/tag";
import { nanoid } from "nanoid";
import React, { createContext, useContext, useState, useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";

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
  getPrevTextBlockId: (_id: string) => string | null;
  getNextTextBlockId: (_id: string) => string | null;
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
  const [title, setTitle] = useState("");
  const { tags, addTag, removeTag } = useTag();
  const [blocks, setBlocks] = useState<EditorBlock[]>([]);

  const addNewBlock = (blockType: BlockType): string => {
    const newElement: EditorBlock = {
      id: nanoid(),
      type: blockType,
      payload: { content: "" },
    };
    setBlocks([...blocks, newElement]);
    return newElement.id;
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

  const getPrevTextBlockId = (id: string): string | null => {
    const idx = blocks.findIndex((block) => block.id === id);
    if (idx === -1) return null;
    for (let i = idx - 1; i >= 0; i--) {
      if (blocks[i].type === "text") {
        return blocks[i].id;
      }
    }
    return null;
  };

  const getNextTextBlockId = (id: string): string | null => {
    const idx = blocks.findIndex((block) => block.id === id);
    if (idx === -1) return null;
    for (let i = idx + 1; i < blocks.length; i++) {
      if (blocks[i].type === "text") {
        return blocks[i].id;
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
        getPrevTextBlockId,
        getNextTextBlockId,
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
