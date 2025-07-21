"use client";

import { SortableElementProvider } from "@/contexts/SortableElementContext";
import { Input } from "@headlessui/react";
import EditorBlock from "./ContentBlock";
import Tagbar from "./Tagbar";
import ToolBar from "./ToolBar";
import useTrans from "@/hooks/translation";
import { useEditor } from "@/contexts/EditorContext";
import { useEffect } from "react";

export default function Editor() {
  const { PostTrans } = useTrans();
  const { blocks, changeTitle, reorderBlocks, addNewBlock } = useEditor();

  useEffect(() => {
    addNewBlock("paragraph");
  }, []);

  return (
    <div>
      <Input
        className="text-h1 px-6 py-4 bg-transparent-reverse-5 w-full rounded-xl data-focus-outline-effect"
        placeholder={PostTrans("title.placeholder")}
        onChange={(e) => changeTitle(e.target.value)}
      />
      <Tagbar />
      <div className="sticky top-0 z-10 mb-4">
        <ToolBar />
      </div>
      <div className="rounded-2xl p-2 mb-4">
        <SortableElementProvider
          elements={blocks}
          handleReorderElements={reorderBlocks}
        >
          {blocks.map((block) => (
            <EditorBlock key={block.id} block={block} />
          ))}
        </SortableElementProvider>
        <div className="h-24" />
      </div>
    </div>
  );
}
