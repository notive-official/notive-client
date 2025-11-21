"use client";

import { ArchiveType } from "@/common/types";
import Tabs from "@/components/common/Tabs";
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

  const changeTitle = (newTitle: string) => {
    setState({ ...state, title: newTitle });
  };

  const categories: { name: string; value: ArchiveType }[] = [
    { name: "NOTE", value: "NOTE" },
    { name: "LINK", value: "REFERENCE" as ArchiveType },
  ];

  const changeArchiveType = (archiveType: ArchiveType) => {
    setState({ ...state, type: archiveType });
  };

  return (
    <div className="h-full w-full flex flex-col items-center mx-auto">
      <div className="h-full w-full flex flex-col max-w-5xl">
        {state.mode === "create" && (
          <Tabs
            className="flex w-full max-w-6xl justify-end p-4"
            categories={categories}
            initialValue={state.type}
            setSelectedValue={(value) => {
              changeArchiveType(value);
            }}
          />
        )}
        <div className="flex flex-col md:flex-row justify-center w-full h-full p-4 gap-4 md:gap-8 overflow-y-auto lg:overflow-hidden">
          <section className="md:min-w-32 md:max-w-72 h-fit w-full">
            <ArchiveSetting thumnailUpload={state.type !== "REFERENCE"} />
          </section>
          <section className="flex flex-col md:min-w-xl max-w-3xl w-full h-full lg:overflow-y-auto text-center px-4">
            <Input
              value={state.title}
              className="text-2xl py-4 bg-surface w-full outline-none px-4"
              placeholder={PostTrans("title.placeholder")}
              onChange={(e) => changeTitle(e.target.value)}
            />
            <Tagbar />
            {state.type === "NOTE" && <BlockEditor />}
            {state.type === "REFERENCE" && <LinkEditor />}
          </section>
        </div>
      </div>
    </div>
  );
}
