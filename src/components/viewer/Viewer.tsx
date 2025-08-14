"use client";

import { useBlockEditor } from "@/contexts/BlockEditorContext";
import BlockView from "./BlockView";
import Tag from "../common/Tag";
import { useEditor } from "@/contexts/EditorContext";
import { BlockType } from "@/common/types";

interface ViewerProps {
  title: string;
  tags: string[];
  blocks: {
    id: string;
    type: BlockType;
    position: number;
    payload: string;
  }[];
}

export default function Viewer({ title, tags, blocks }: ViewerProps) {
  return (
    <div className="flex flex-col gap-8 w-full">
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
          <BlockView key={block.id} block={block} />
        ))}
      </div>
      <div className="h-24" />
    </div>
  );
}
