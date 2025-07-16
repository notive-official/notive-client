"use client";

import Tag from "@/components/common/Tag";
import { useEditor } from "@/contexts/EditorContext";
import useTrans from "@/hooks/translation";
import { Input } from "@headlessui/react";

import { useState } from "react";

export default function Tagbar() {
  const { PostTrans } = useTrans();
  const { tags, addTag, removeTag } = useEditor();

  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  return (
    <div className="w-full my-4">
      <Input
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isComposing && input !== "") {
            addTag(input);
            setInput("");
          }
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full rounded-xl bg-transparent-reverse px-4 py-2 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus-outline-effect"
        placeholder={PostTrans("tag.placeholder")}
      />
      <div className="flex flex-row flex-wrap gap-2 my-3">
        {tags.map((tag) => {
          return (
            <div key={tag} onClick={() => removeTag(tag)}>
              <Tag value={tag} isRemovable={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
