"use client";

import { ArchiveType } from "@/common/types";
import { ComboSelection } from "@/hooks/useCombo";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface EditorContextType {
  title: string;
  tags: string[];
  thumbnail: File | null;
  isPublic: boolean;
  archiveType: ArchiveType;
  isDuplicable: boolean;
  group: ComboSelection | null;
  url: string;
  changeTitle: Dispatch<SetStateAction<string>>;
  changeThumbnail: Dispatch<SetStateAction<File | null>>;
  changeGroup: Dispatch<SetStateAction<ComboSelection | null>>;
  changeIsPublic: Dispatch<SetStateAction<boolean>>;
  changeArchiveType: Dispatch<SetStateAction<ArchiveType>>;
  changeIsDuplicable: Dispatch<SetStateAction<boolean>>;
  changeUrl: Dispatch<SetStateAction<string>>;
  addTag: (_tag: string) => void;
  removeTag: (_tag: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [archiveType, setArchiveType] = useState<ArchiveType>("NOTE");
  const [isDuplicable, setIsDuplicable] = useState(false);
  const [group, setGroup] = useState<ComboSelection | null>(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [url, setUrl] = useState<string>("");

  const addTag = (val: string) => {
    if (!tags.includes(val)) {
      tags.push(val);
      setTags([...tags]);
    }
  };

  const removeTag = (val: string) => {
    setTags(tags.filter((tag) => tag !== val));
  };

  return (
    <EditorContext.Provider
      value={{
        title,
        tags,
        thumbnail,
        isPublic,
        archiveType,
        isDuplicable,
        group,
        url,
        changeTitle: setTitle,
        changeThumbnail: setThumbnail,
        changeGroup: setGroup,
        changeIsPublic: setIsPublic,
        changeArchiveType: setArchiveType,
        changeIsDuplicable: setIsDuplicable,
        changeUrl: setUrl,
        addTag,
        removeTag,
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
