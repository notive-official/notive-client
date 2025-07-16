import { ArrowUpCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { EditorBlock, useEditor } from "@/contexts/EditorContext";
import InputBox from "../common/InputBox";

interface LinkBlockProps {
  block: EditorBlock;
}

export default function LinkBlock({ block }: LinkBlockProps) {
  const { updateBlock } = useEditor();
  const [link, setLink] = useState("");
  const { id } = block;

  const handleIconClick = () => {
    updateBlock(id, { content: link.trim() });
  };

  return (
    <div className="flex flex-col justify-between items-center">
      <InputBox
        value={link}
        placeholder="Add a link"
        handleChange={(e) => setLink(e.target.value)}
        icon={<ArrowUpCircleIcon className="w-5 h-5" />}
        handleIconClick={handleIconClick}
      />
    </div>
  );
}
