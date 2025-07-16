"use client";

import { useState } from "react";

export default function useTag() {
  const [tags, setTags] = useState<string[]>([]);

  const addTag = (val: string) => {
    if (!tags.includes(val)) {
      tags.push(val);
      setTags([...tags]);
    }
  };

  const removeTag = (val: string) => {
    setTags(tags.filter((tag) => tag !== val));
  };

  return { tags, addTag, removeTag };
}
