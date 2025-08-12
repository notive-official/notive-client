import { useAuth } from "@/contexts/AuthContext";
import { useListTagsQuery } from "@/hooks/api/archive/tag";
import { useState } from "react";
import Hangul from "hangul-js";
import { Button, Input } from "@headlessui/react";
import Tag from "../common/Tag";

export default function TagSearchBar() {
  const { isAuthenticated } = useAuth();
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const { data: getTagsRes } = useListTagsQuery({ enabled: isAuthenticated });

  const handleAddingTag = (value: string) => {};

  const filteredTags =
    input === ""
      ? getTagsRes?.content
      : getTagsRes?.content.filter((tag) => Hangul.search(tag, input) > -1);

  return (
    <div className="h-full w-full flex flex-col md:flex-row items-center mx-auto">
      <div className="w-full">
        <Input
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isComposing && input !== "")
              handleAddingTag(input);
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-xl bg-transparent-reverse-5 px-4 py-2 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus-outline-effect"
          placeholder={"태그를 입력하세요."}
        />

        <div
          className="mt-1 z-20 rounded-xl p-2 min-h-10 max-h-40 overflow-y-auto"
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
      </div>
    </div>
  );
}
