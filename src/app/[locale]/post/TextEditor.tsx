"use client";

import InputBox from "../../../components/InputBox";
import useTrans from "@/hooks/translation";
import Tagbar from "../../../components/editor/Tagbar";
import ToolBar from "../../../components/editor/ToolBar";
import Tag from "@/components/Tag";
import EditorElement from "@/components/editor/EditorElement";
import { useEditor } from "@/contexts/EditorProvider";
import { Button } from "@headlessui/react";
import PreviewElement from "@/components/preview/PreviewElement";

export default function TextEditor() {
  const { PostTrans } = useTrans();
  const { elements, title, tags, handleChangeTitle } = useEditor();

  return (
    <div className="h-full w-full flex flex-row mx-auto divide-x-4 divide-primary">
      <section className="w-1/2 h-full overflow-y-auto text-center p-4">
        <InputBox
          placeholder={PostTrans("title.placeholder")}
          inputClassName="text-3xl font-bold px-6 py-4"
          handleChange={(e) => handleChangeTitle(e.target.value)}
          value={title}
        />
        <Tagbar />
        <div className="sticky -top-2 z-10">
          <ToolBar />
        </div>
        {elements.map((element) => (
          <EditorElement key={element.id} element={element} />
        ))}
      </section>
      <section className="w-1/2 h-full overflow-y-auto text-left p-8">
        <div className="flex flex-col gap-8">
          <div className="fg-principal text-3xl font-bold whitespace-normal break-words">
            {title}
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            {tags.map((tag) => {
              return <Tag key={tag} value={tag} />;
            })}
          </div>
          {elements.map((element) => (
            <PreviewElement key={element.id} element={element} />
          ))}
        </div>
      </section>
    </div>
  );
}
