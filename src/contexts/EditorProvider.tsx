"use client";

import { EditorElementCategory } from "@/common/types";
import { UploadedFile } from "@/hooks/imageUpload";
import { UploadedLink } from "@/hooks/linkUpload";
import useTag from "@/hooks/tag";
import { nanoid } from "nanoid";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface EditorContextType {
  title: string;
  tags: string[];
  elements: EditorElementContent[];
  handleChangeTitle: (title: string) => void;
  handleAddTag: (tag: string) => void;
  handleRemoveTag: (tag: string) => void;
  handleAddElement: (element: EditorElementCategory) => void;
  handleRemoveElement: (id: string) => void;
  handleUpdateElement: (id: string, data: Partial<ElementContent>) => void;
}

export interface EditorElementContent {
  id: string;
  elementCategory: EditorElementCategory;
  data: ElementContent;
}

export interface ElementContent {
  uploadedFiles: UploadedFile[];
  links: UploadedLink[];
  description: string;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState("");
  const { tags, handleAddTag, handleRemoveTag } = useTag();
  const [elements, setElements] = useState<EditorElementContent[]>([]);

  const handleAddElement = (element: EditorElementCategory) => {
    const newElement: EditorElementContent = {
      id: nanoid(),
      elementCategory: element,
      data: {
        description: "",
        links: [],
        uploadedFiles: [],
      },
    };
    setElements([...elements, newElement]);
  };
  const handleRemoveElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
  };

  const handleUpdateElement = (id: string, data: Partial<ElementContent>) => {
    setElements(
      elements.map((el) =>
        el.id === id ? { ...el, data: { ...el.data, ...data } } : el
      )
    );
  };

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
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
