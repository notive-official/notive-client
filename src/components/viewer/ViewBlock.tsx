"use client";

import { EditorBlock } from "@/contexts/EditorContext";
import TextView from "./TextView";
import LinkView from "./LinkView";
import ImageView from "./ImageView";
import { isTextBlock } from "@/common/utils";

interface ViewBlockProps {
  block: EditorBlock;
}

export default function ViewBlock({ block }: ViewBlockProps) {
  const { type: blockType, payload } = block;
  return (
    <div className="rounded-xl w-full">
      {blockType === "image" && payload.file ? (
        <ImageView file={payload.file} downloadable={true} />
      ) : null}
      {blockType === "link" ? <LinkView url={payload.content} /> : null}
      {isTextBlock(blockType) ? (
        <TextView blockType={blockType} text={payload.content} />
      ) : null}
    </div>
  );
}
