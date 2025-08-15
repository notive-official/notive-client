"use client";

import BlockView from "./BlockView";
import Tag from "../common/Tag";
import Image from "next/image";
import { BlockType } from "@/common/types";
import ThumbnailView from "./ThumbnailView";

interface ViewerProps {
  title: string;
  thumbnailPath: string;
  tags: string[];
  blocks: {
    id: string;
    type: BlockType;
    position: number;
    payload: string;
  }[];
}

export default function Viewer({
  title,
  thumbnailPath,
  tags,
  blocks,
}: ViewerProps) {
  return (
    <div className="flex flex-row gap-16 w-full h-full">
      <div className="hidden lg:flex">
        <ThumbnailView thumbnailPath={thumbnailPath} />
      </div>
      <div className="flex flex-col w-full gap-8 overflow-y-auto">
        <div className="flex lg:hidden">
          <ThumbnailView
            thumbnailPath={thumbnailPath}
            width={200}
            height={200}
          />
        </div>
        <h1 className="fg-principal text-5xl font-bold whitespace-normal break-words">
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
      </div>
    </div>
  );
}
