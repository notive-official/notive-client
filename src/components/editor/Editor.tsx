"use client";

import { SortableElementProvider } from "@/contexts/SortableElementContext";
import { Input } from "@headlessui/react";
import EditorElement from "./ContentBlock";
import Tagbar from "./Tagbar";
import ToolBar from "./ToolBar";
import useTrans from "@/hooks/translation";
import { useEditor } from "@/contexts/EditorContext";

export default function Editor() {
  const { PostTrans } = useTrans();
  const { blocks, changeTitle, reorderBlocks } = useEditor();
  return (
    <div>
      <Input
        className="text-h1 px-6 py-4 bg-transparent-reverse w-full rounded-xl data-focus-outline-effect"
        placeholder={PostTrans("title.placeholder")}
        onChange={(e) => changeTitle(e.target.value)}
      />
      <Tagbar />
      <div className="sticky -top-2 z-10 mb-2">
        <ToolBar />
      </div>
      <SortableElementProvider
        elements={blocks}
        handleReorderElements={reorderBlocks}
      >
        {blocks.map((block) => (
          <EditorElement key={block.id} block={block} />
        ))}
      </SortableElementProvider>
    </div>
  );
}
