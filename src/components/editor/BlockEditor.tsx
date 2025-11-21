"use client";

import { SortableElementProvider } from "@/contexts/SortableElementContext";
import EditorBlock from "./ContentBlock";
import ToolBar from "./ToolBar";
import { useBlockEditor } from "@/contexts/BlockEditorContext";

export default function BlockEditor() {
  const { blockState, reorderBlocks } = useBlockEditor();

  const { blocks } = blockState;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="sticky top-0 z-10 mb-4">
        <ToolBar />
      </div>
      <div className="rounded-2xl mb-4">
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
