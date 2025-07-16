"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ImageUploader from "./ImageBlock";
import LinkUploader from "./LinkBlock";
import { EditorBlock } from "@/contexts/EditorContext";
import { useSortableElement } from "@/contexts/SortableElementContext";
import TextUploader from "./TextBlock";
import { useEffect, useState } from "react";
import BlockMenu from "./BlockMenu";
import { useFocusBlock } from "@/contexts/FocusBlockContext";

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
      <div className="relative">
        <div
          className="cursor-pointer rounded-md click-effect transition-colors"
          {...attributes}
          {...listeners}
        >
          <EllipsisVerticalIcon
            className={`w-6 h-6 ${
              onFocus ? "text-black/50" : "text-transparent"
            }`}
          />
        </div>
        <BlockMenu block={block} />
      </div>
      <div
        className={`rounded-xl w-full ${
          isActive(block.id) ? "bg-transparent-reverse" : "bg-transparent"
        }`}
      >
        <div className="flex">
          <div className="w-full">
            {block.type === "image" ? <ImageUploader block={block} /> : null}
            {block.type === "link" ? <LinkUploader block={block} /> : null}
            {block.type === "text" ? <TextUploader block={block} /> : null}
            {block.type === "h1" ? <TextUploader block={block} /> : null}
            {block.type === "h2" ? <TextUploader block={block} /> : null}
            {block.type === "h3" ? <TextUploader block={block} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
