import { TextType } from "@/common/types";
import { useState } from "react";

export interface UploadedText {
  type: TextType;
  value: string;
}

export default function useTextUpload() {
  const [text, setText] = useState<UploadedText>({
    type: "plain",
    value: "",
  });

  const handleChange = (value: string) => {
    setText({ type: text.type, value });
  };

  return { text, handleChange };
}
