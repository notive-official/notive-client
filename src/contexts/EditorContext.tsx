"use client";

import { ArchiveType } from "@/common/types";
import { ComboSelection } from "@/hooks/useCombo";
import { createContext, useContext, useMemo, useState } from "react";
import { BlockEditorProvider, EditorBlock } from "./BlockEditorContext";
import { FocusBlockProvider } from "./FocusBlockContext";

export interface EditorState {
  id?: string;
  title: string;
  tags: string[];
  thumbnail: {
    path: string;
    file: File | null;
  } | null;
  isPublic: boolean;
  type: ArchiveType;
  isDuplicable: boolean;
  group: ComboSelection | null;
  url: string;
  mode: "create" | "edit";
  blocks: EditorBlock[];
}

type EditorContextType = {
  state: EditorState;
  setState: React.Dispatch<React.SetStateAction<EditorState>>;
  addTag: (_tag: string) => void;
  removeTag: (_tag: string) => void;
  getDirty: () => Partial<EditorState>;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

type ProviderProps = {
  initial: Partial<EditorState>;
  postKey: string;
  children: React.ReactNode;
};

export function EditorProvider({ initial, postKey, children }: ProviderProps) {
  const defaults = useMemo(
    () => ({
      id: initial.id,
      title: initial.title ?? "",
      tags: initial.tags ?? [],
      thumbnail: initial.thumbnail ?? null,
      isPublic: initial.isPublic ?? false,
      type: initial.type ?? "NOTE",
      isDuplicable: initial.isDuplicable ?? false,
      group: initial.group ?? null,
      url: initial.url ?? "",
      blocks: initial.blocks ?? [],
      mode: (initial.mode ?? (initial.id ? "edit" : "create")) as
        | "create"
        | "edit",
    }),
    [postKey]
  );
  const [state, setState] = useState<EditorState>(defaults);
  const [isTagDirty, setIsTagDirty] = useState(false);

  const addTag = (val: string) => {
    if (!state.tags.includes(val)) {
      const tags = [...state.tags, val];
      setState({ ...state, tags });
      setIsTagDirty(true);
    }
  };

  const removeTag = (val: string) => {
    const tags = state.tags.filter((tag) => tag !== val);
    setState({ ...state, tags });
    setIsTagDirty(true);
  };

  const getDirty = () => {
    const dirty: Partial<EditorState> = {
      title: defaults.title !== state.title.trim() ? state.title : undefined,
      thumbnail:
        defaults.thumbnail?.path !== state.thumbnail?.path
          ? state.thumbnail
          : undefined,
      isPublic:
        defaults.isPublic !== state.isPublic ? state.isPublic : undefined,
      type: defaults.type !== state.type ? state.type : undefined,
      isDuplicable:
        defaults.isDuplicable !== state.isDuplicable
          ? state.isDuplicable
          : undefined,
      group: defaults.group !== state.group ? state.group : undefined,
      url: defaults.url !== state.url ? state.url : undefined,
      tags: isTagDirty ? state.tags : undefined,
    };
    return dirty;
  };

  const value = useMemo(
    () => ({ state, setState, addTag, removeTag, getDirty }),
    [state]
  );

  return (
    <FocusBlockProvider>
      <BlockEditorProvider initial={state.blocks} postKey={postKey}>
        <EditorContext.Provider value={value} key={postKey}>
          {children}
        </EditorContext.Provider>
      </BlockEditorProvider>
    </FocusBlockProvider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be inside EditorProvider");
  return ctx;
}
