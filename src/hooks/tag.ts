"use client";

import { useState } from "react";

export default function useTag() {
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (val: string) => {
    if (!tags.includes(val)) {
      tags.push(val);
      setTags([...tags]);
    }
  };

  const handleRemoveTag = (val: string) => {
    setTags(tags.filter((tag) => tag !== val));
  };

  return { tags, handleAddTag, handleRemoveTag };
}
