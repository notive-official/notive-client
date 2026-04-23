"use client";

import TextView from "./TextView";
import LinkView from "./LinkView";
import ImageView from "./ImageView";
import { isImageBlock, isLinkBlock, isTextBlock } from "@/common/utils";
import { BlockType } from "@/common/types";

interface ViewBlockProps { block: { id: string; type: BlockType; payload: string } }

export default function BlockView({ block }: ViewBlockProps) {
  const { type, payload } = block;
  if (!payload) return null;
  return (
    <>
      {isImageBlock(type) && <ImageView filePath={payload} />}
      {isLinkBlock(type) && <LinkView url={payload} />}
      {isTextBlock(type) && <TextView blockType={type} text={payload} />}
    </>
  );
}
