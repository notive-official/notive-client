"use client";

import { EditorBlock } from "@/contexts/EditorContext";
import TextView from "./TextView";
import LinkView from "./LinkView";
import ImageView from "./ImageView";

interface ViewBlockProps {
  block: EditorBlock;
}

export default function ViewBlock({ block }: ViewBlockProps) {
  const { type: blockType, payload } = block;
  return (
    <div className="space-y-2 rounded-xl w-full">
      {blockType === "image" && payload.file ? (
        <ImageView file={payload.file} />
      ) : null}
      {blockType === "link" ? <LinkView url={payload.content} /> : null}
      {blockType === "text" || "h1" || "h2" || "h3" ? (
        <TextView blockType={blockType} text={payload.content} />
      ) : null}
    </div>
  );
}
