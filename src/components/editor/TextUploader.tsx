import useTextUpload from "@/hooks/textUpload";
import TextAreaBox from "../common/TextAreaBox";
import { useEditor } from "@/contexts/EditorProvider";
import { useEffect } from "react";

export default function TextUploader({ id }: { id: string }) {
  const { text, handleChange } = useTextUpload();

  const { handleUpdateElement } = useEditor();

  useEffect(() => {
    handleUpdateElement(id, {
      text: text,
    });
  }, [text]);

  return (
    <TextAreaBox
      placeholder="Add a description"
      handleChange={(e) => handleChange(e.target.value)}
      inputClassName="bg-transparent-reverse"
      rows={4}
      value={text.value}
      scrollable={false}
    />
  );
}
