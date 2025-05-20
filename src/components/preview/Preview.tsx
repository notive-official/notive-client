"use client";

import { useEditor } from "@/contexts/EditorProvider";
import PreviewElement from "./PreviewElement";
import Tag from "../common/Tag";

export default function Preview() {
  const { elements, title, tags } = useEditor();
  return (
    <div className="flex flex-col gap-8">
      <div className="fg-principal text-3xl font-bold whitespace-normal break-words">
        {title}
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {tags.map((tag) => {
          return <Tag key={tag} value={tag} />;
        })}
      </div>
      {elements.map((element) => (
        <PreviewElement key={element.id} element={element} />
      ))}
    </div>
  );
}
