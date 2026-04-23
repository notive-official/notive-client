"use client";

import { SortableElementProvider } from "@/contexts/SortableElementContext";
import EditorBlock from "./ContentBlock";
import ToolBar from "./ToolBar";
import { useBlockEditor } from "@/contexts/BlockEditorContext";

export default function BlockEditor() {
  const { blockState, reorderBlocks } = useBlockEditor();
  const { blocks } = blockState;

  return (
    <div className="flex flex-col w-full">
      <div className="sticky top-0 z-10 py-2 bg-surface">
        <ToolBar />
      </div>
      <div className="mt-2 mb-8">
        <SortableElementProvider elements={blocks} handleReorderElements={reorderBlocks}>
          {blocks.map((block) => (
            <EditorBlock key={block.id} block={block} />
          ))}
        </SortableElementProvider>
        <div className="h-32" />
      </div>
    </div>
  );
}
