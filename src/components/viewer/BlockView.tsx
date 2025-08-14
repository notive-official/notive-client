"use client";

import { EditorBlock } from "@/contexts/BlockEditorContext";
import TextView from "./TextView";
import LinkView from "./LinkView";
import ImageView from "./ImageView";
import { isImageBlock, isLinkBlock, isTextBlock } from "@/common/utils";
import { BlockType } from "@/common/types";

interface ViewBlockProps {
  block: {
    id: string;
    type: BlockType;
    payload: string;
  };
}

export default function BlockView({ block }: ViewBlockProps) {
  const { type, payload } = block;
  return (
    <div className="rounded-xl w-full">
      {payload ? (
        <div>
          {isImageBlock(type) && (
            <ImageView filePath={payload} downloadable={true} />
          )}
          {isLinkBlock(type) && <LinkView url={payload} />}
          {isTextBlock(type) && <TextView blockType={type} text={payload} />}
        </div>
      ) : null}
    </div>
  );
}
