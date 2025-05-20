"use client";

import { SortableElementProvider } from "@/contexts/SortableElementContext";
import { Input } from "@headlessui/react";
import EditorElement from "./EditorElement";
import Tagbar from "./Tagbar";
import ToolBar from "./ToolBar";
import useTrans from "@/hooks/translation";
import { useEditor } from "@/contexts/EditorProvider";

export default function Editor() {
  const { PostTrans } = useTrans();
  const { elements, handleChangeTitle, handleReorderElements } = useEditor();
  return (
    <div>
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
    </div>
  );
}
