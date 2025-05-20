"use client";

import { EditorElementCategory } from "@/common/types";
import { UploadedFile } from "@/hooks/imageUpload";
import { UploadedLink } from "@/hooks/linkUpload";
import useTag from "@/hooks/tag";
import { nanoid } from "nanoid";
import React, { createContext, useContext, useState, useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { UploadedText } from "@/hooks/textUpload";

interface EditorContextType {
  title: string;
  tags: string[];
  elements: EditorElementType[];
  handleChangeTitle: (_title: string) => void;
  handleAddTag: (_tag: string) => void;
  handleRemoveTag: (_tag: string) => void;
  handleAddElement: (_element: EditorElementCategory) => void;
  handleRemoveElement: (_id: string) => void;
  handleUpdateElement: (_id: string, _data: Partial<CommonElementType>) => void;
  handleReorderElements: (_oldIndex: number, _newIndex: number) => void;
}

export interface EditorElementType {
  id: string;
  elementCategory: EditorElementCategory;
  data: CommonElementType;
}

export interface CommonElementType {
  uploadedFiles: UploadedFile[];
  links: UploadedLink[];
  text: UploadedText;
  description: string;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState("");
  const { tags, handleAddTag, handleRemoveTag } = useTag();
  const [elements, setElements] = useState<EditorElementType[]>([]);

  const handleAddElement = (element: EditorElementCategory) => {
    const newElement: EditorElementType = {
      id: nanoid(),
      elementCategory: element,
      data: {
        description: "",
        links: [],
        uploadedFiles: [],
        text: {
          type: "plain",
          value: "",
        },
      },
    };
    setElements([...elements, newElement]);
  };
  const handleRemoveElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
  };

  const handleUpdateElement = (
    id: string,
    data: Partial<CommonElementType>
  ) => {
    setElements(
      elements.map((el) =>
        el.id === id ? { ...el, data: { ...el.data, ...data } } : el
      )
    );
  };

  const handleReorderElements = useCallback(
    (oldIndex: number, newIndex: number) => {
      setElements((prev) => arrayMove(prev, oldIndex, newIndex));
    },
    []
  );

  return (
    <EditorContext.Provider
      value={{
        title,
        tags,
        elements,
        handleChangeTitle: setTitle,
        handleAddTag,
        handleRemoveTag,
        handleAddElement,
        handleRemoveElement,
        handleUpdateElement,
        handleReorderElements,
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
