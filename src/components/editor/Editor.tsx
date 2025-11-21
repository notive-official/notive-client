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

  const changeTitle = (newTitle: string) => {
    setState({ ...state, title: newTitle });
  };

  return (
    <div className="w-full flex flex-col items-center mx-auto">
      <div className="w-full flex flex-col max-w-xl md:max-w-5xl">
        <div className="flex flex-col md:flex-row justify-center w-full p-4 gap-4 md:gap-8">
          {/* 왼쪽 설정 패널 */}
          <section className="md:min-w-32 md:max-w-72 w-full md:self-start md:sticky md:top-24">
            <ArchiveSetting thumnailUpload={state.type !== "REFERENCE"} />
          </section>

          {/* 오른쪽 에디터 */}
          <section className="flex flex-col md:min-w-xl md:max-w-3xl w-full text-center">
            <Input
              value={state.title}
              className="text-2xl py-4 bg-transparent w-full outline-none px-4"
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
