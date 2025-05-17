"use client";

import InputBox from "../../../components/common/InputBox";
import useTrans from "@/hooks/translation";
import Tagbar from "../../../components/editor/Tagbar";
import ToolBar from "../../../components/editor/ToolBar";
import Tag from "@/components/common/Tag";
import EditorElement from "@/components/editor/EditorElement";
import { useEditor } from "@/contexts/EditorProvider";
import PreviewElement from "@/components/preview/PreviewElement";
import { SortableElementProvider } from "@/contexts/SortableElementContext";
import { Button, Input } from "@headlessui/react";

export default function TextEditor() {
  const { PostTrans } = useTrans();
  const { elements, title, tags, handleChangeTitle, handleReorderElements } =
    useEditor();

  return (
    <div className="h-full w-full flex flex-row mx-auto divide-x-4 divide-primary">
      <section className="w-1/2 h-full overflow-y-auto text-center p-4">
        <Input
          className="text-3xl font-bold px-6 py-4 bg-transparent-reverse w-full rounded-xl data-focus-outline-effect"
          placeholder={PostTrans("title.placeholder")}
          onChange={(e) => handleChangeTitle(e.target.value)}
        />
        <Tagbar />
        <div className="sticky -top-2 z-10">
          <ToolBar />
        </div>
        <SortableElementProvider
          elements={elements}
          handleReorderElements={handleReorderElements}
        >
          {elements.map((element) => (
            <EditorElement key={element.id} element={element} />
          ))}
        </SortableElementProvider>
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
