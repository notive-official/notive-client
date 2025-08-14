"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ImageUploader from "./ImageBlock";
import LinkUploader from "./LinkBlock";
import { EditorBlock } from "@/contexts/BlockEditorContext";
import { useSortableElement } from "@/contexts/SortableElementContext";
import TextUploader from "./TextBlock";
import { useState } from "react";
import BlockMenu from "./BlockMenu";
import { useFocusBlock } from "@/contexts/FocusBlockContext";
import { isImageBlock, isLinkBlock, isTextBlock } from "@/common/utils";

interface EditorBlockProps {
  block: EditorBlock;
}

export default function ContentBlock({ block }: EditorBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: block.id });
  const { isActive } = useSortableElement();
  const { setFocusedBlockId } = useFocusBlock();

  const [onFocus, setOnFocus] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      tabIndex={0}
      onFocus={() => setFocusedBlockId(block.id)}
      className="flex flex-row justify-center items-center w-full gap-1"
      onMouseEnter={() => setOnFocus(true)}
      onMouseLeave={() => setOnFocus(false)}
    >
      <div className="relative ">
        <div
          className="cursor-pointer rounded-md click-effect transition-colors"
          {...attributes}
          {...listeners}
        >
          <EllipsisVerticalIcon
            className={`w-6 h-6 ${
              onFocus ? "fg-principal" : "text-transparent"
            }`}
          />
        </div>
        <BlockMenu block={block} />
      </div>
      <div
        className={`rounded-xl w-full ${
          isActive(block.id) ? "bg-transparent-reverse-5" : "bg-transparent"
        }`}
      >
        <div className="flex">
          <div className="w-full">
            {isImageBlock(block.type) ? <ImageUploader block={block} /> : null}
            {isLinkBlock(block.type) ? <LinkUploader block={block} /> : null}
            {isTextBlock(block.type) ? <TextUploader block={block} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
