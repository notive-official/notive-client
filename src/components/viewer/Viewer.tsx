"use client";

import { useBlockEditor } from "@/contexts/BlockEditorContext";
import ViewBlock from "./ViewBlock";
import Tag from "../common/Tag";
import { useEditor } from "@/contexts/EditorContext";

export default function Viewer() {
  const { blocks } = useBlockEditor();
  const { title, tags } = useEditor();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="fg-principal text-h1 whitespace-normal break-words">
        {title.length === 0 ? <br /> : title}
      </h1>
      <div className="flex flex-row flex-wrap gap-2">
        {tags.map((tag) => {
          return <Tag key={tag} value={tag} />;
        })}
      </div>
      <div className="flex flex-col gap-2">
        {blocks.map((block) => (
          <ViewBlock key={block.id} block={block} />
        ))}
      </div>
      <div className="h-24" />
    </div>
  );
}
