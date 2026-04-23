"use client";

import ArchiveSetting from "@/components/editor/ArchiveSetting";
import BlockEditor from "@/components/editor/BlockEditor";
import { LinkEditor } from "@/components/editor/LinkEditor";
import { useEditor } from "@/contexts/EditorContext";
import { Input } from "@headlessui/react";
import Tagbar from "./Tagbar";
import useTranslation from "@/hooks/useTranslation";

export default function Editor() {
  const { state, setState } = useEditor();
  const { PostTrans } = useTranslation();

  return (
    <div className="w-full max-w-3xl mx-auto px-5 md:px-8 py-8">
      {/* Title - large, prominent */}
      <Input
        value={state.title}
        className="text-3xl md:text-4xl font-bold py-3 bg-transparent w-full outline-none placeholder:text-muted-foreground/30 tracking-tight"
        placeholder={PostTrans("title.placeholder")}
        onChange={(e) => setState({ ...state, title: e.target.value })}
      />

      {/* Tags */}
      <Tagbar />

      {/* Settings - inline, compact */}
      <ArchiveSetting thumnailUpload={state.type !== "REFERENCE"} />

      {/* Divider */}
      <div className="h-px bg-border my-6" />

      {/* Content area */}
      {state.type === "NOTE" && <BlockEditor />}
      {state.type === "REFERENCE" && <LinkEditor />}
    </div>
  );
}
