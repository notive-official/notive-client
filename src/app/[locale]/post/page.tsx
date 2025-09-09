"use client";

import { ArchiveType } from "@/common/types";
import Tabs from "@/components/common/Tabs";
import ArchiveSetting from "@/components/editor/ArchiveSetting";
import BlockEditor from "@/components/editor/BlockEditor";
import { LinkEditor } from "@/components/editor/LinkEditor";
import { useEditor } from "@/contexts/EditorContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useState } from "react";
export default function PostPage() {
  useRequireAuth();
  const { changeArchiveType } = useEditor();

  const categories = [
    { index: 0, name: "NOTE", value: "NOTE" as ArchiveType },
    { index: 1, name: "LINK", value: "REFERENCE" as ArchiveType },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="h-full w-full flex flex-col items-center mx-auto">
      <div className="h-full w-full flex flex-col max-w-5xl">
        <Tabs
          className="flex w-full max-w-6xl justify-end p-4"
          categories={categories}
          selectedIndex={selectedIndex}
          setSelectedIndex={(index) => {
            setSelectedIndex(index);
            changeArchiveType(categories[index].value as ArchiveType);
          }}
        />
        {selectedIndex === 0 && (
          <div className="flex flex-col md:flex-row justify-center w-full h-full p-4 gap-4 md:gap-8 overflow-y-auto lg:overflow-hidden">
            <section className="md:min-w-32 md:max-w-72 h-fit w-full">
              <ArchiveSetting />
            </section>
            <section className="relative md:min-w-xl max-w-3xl h-full lg:overflow-y-auto text-center w-full">
              <BlockEditor />
            </section>
          </div>
        )}
        {selectedIndex === 1 && (
          <div className="flex flex-col md:flex-row justify-center w-full h-full p-4 gap-4 md:gap-8 overflow-y-auto lg:overflow-hidden">
            <section className="md:min-w-32 md:max-w-72 h-fit w-full">
              <ArchiveSetting thumnailUpload={false} />
            </section>
            <section className="relative md:min-w-xl max-w-3xl h-full lg:overflow-y-auto text-center w-full">
              <LinkEditor />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
