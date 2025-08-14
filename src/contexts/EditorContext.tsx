"use client";

import { ArchiveType } from "@/common/types";
import { ComboSelection } from "@/components/common/Combo";
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
  isReplicable: boolean;
  group: ComboSelection | null;
  changeTitle: Dispatch<SetStateAction<string>>;
  changeThumbnail: Dispatch<SetStateAction<File | null>>;
  changeGroup: Dispatch<SetStateAction<ComboSelection | null>>;
  changeIsPublic: Dispatch<SetStateAction<boolean>>;
  changeArchiveType: Dispatch<SetStateAction<ArchiveType>>;
  changeIsReplicable: Dispatch<SetStateAction<boolean>>;
  addTag: (_tag: string) => void;
  removeTag: (_tag: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [archiveType, setArchiveType] = useState<ArchiveType>("NOTE");
  const [isReplicable, setIsReplicable] = useState(false);
  const [group, setGroup] = useState<ComboSelection | null>(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);

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
        isReplicable,
        group,
        changeTitle: setTitle,
        changeThumbnail: setThumbnail,
        changeGroup: setGroup,
        changeIsPublic: setIsPublic,
        changeArchiveType: setArchiveType,
        changeIsReplicable: setIsReplicable,
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
