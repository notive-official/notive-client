"use client";

import BlockView from "./BlockView";
import Tag from "../common/Tag";
import Image from "next/image";
import { BlockType } from "@/common/types";
import ThumbnailView from "./ThumbnailView";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { Button } from "@headlessui/react";

interface ViewerProps {
  title: string;
  thumbnailPath: string;
  tags: string[];
  canEdit: boolean;
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
  canEdit,
  blocks,
}: ViewerProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-16 w-full h-full overflow-y-auto lg:overflow-hidden p-4">
      <div className="flex flex-col gap-5">
        <h1 className="text-foreground text-4xl font-bold whitespace-normal break-words">
          {title.length === 0 ? <br /> : title}
        </h1>
        <div className="flex flex-row flex-wrap gap-2">
          {tags.map((tag) => {
            return <Tag key={tag} value={tag} />;
          })}
        </div>
        <ThumbnailView thumbnailPath={thumbnailPath} />
      </div>

      <div className="flex flex-col w-full gap-8 lg:p-8 lg:overflow-y-auto">
        <div className="flex flex-col gap-2">
          {blocks.map((block) => (
            <BlockView key={block.id} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}
