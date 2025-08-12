"use client";

import Tag from "@/components/common/Tag";
import { useAuth } from "@/contexts/AuthContext";
import { useEditor } from "@/contexts/EditorContext";
import { useListTagsQuery } from "@/hooks/api/archive/tag";
import useTrans from "@/hooks/useTranslation";
import { Button, Input } from "@headlessui/react";
import Hangul from "hangul-js";

import { useState } from "react";

export default function Tagbar() {
  const { PostTrans } = useTrans();
  const { tags: addedTags, addTag, removeTag } = useEditor();

  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [showStoredTag, setShowStoredTag] = useState(false);

  const { isAuthenticated } = useAuth();
  const { data: getTagsRes } = useListTagsQuery({ enabled: isAuthenticated });

  const handleAddingTag = (value: string) => {
    addTag(value);
    setInput("");
    setShowStoredTag(false);
  };

  const filteredTags =
    input === ""
      ? getTagsRes?.content
      : getTagsRes?.content.filter((tag) => Hangul.search(tag, input) > -1);

  return (
    <div className="w-full my-4">
      <div className="relative">
        <Input
          onClick={() => setShowStoredTag(true)}
          onBlur={() => setShowStoredTag(false)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isComposing && input !== "")
              handleAddingTag(input);
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-xl bg-transparent-reverse-5 px-4 py-2 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus-outline-effect"
          placeholder={PostTrans("tag.placeholder")}
        />
        {showStoredTag && (
          <div
            className="absolute left-0 right-0 top-full
                 mt-1 z-20 rounded-xl bg-contrast-sub p-2 shadow-lg
                 min-h-10 max-h-40 overflow-y-auto"
            onMouseDown={(e) => e.preventDefault()}
          >
            <div className="flex flex-wrap items-center gap-2">
              {filteredTags?.map((v) => (
                <Button
                  key={v}
                  className="w-fit"
                  onClick={() => handleAddingTag(v)}
                >
                  <Tag value={v} />
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row flex-wrap gap-2 my-3">
        {addedTags.map((addedTag) => {
          return (
            <div key={addedTag} onClick={() => removeTag(addedTag)}>
              <Tag value={addedTag} isRemovable={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
