import { ArrowUpIcon } from "@heroicons/react/16/solid";
import { useCallback, useState, memo } from "react";
import { EditorBlock, useEditor } from "@/contexts/EditorContext";
import InputBox from "../common/InputBox";
import ViewBlock from "../viewer/ViewBlock";
import { Button } from "@headlessui/react";
import { useFocusBlock } from "@/contexts/FocusBlockContext";

interface LinkBlockProps {
  block: EditorBlock;
}

export function LinkBlock({ block }: LinkBlockProps) {
  const { updateBlock } = useEditor();
  const { focusedBlockId, setFocusedBlockId } = useFocusBlock();
  const [link, setLink] = useState("");
  const { id } = block;

  const handleEvent = useCallback(() => {
    updateBlock(id, { content: link.trim() });
    setLink("");
  }, [updateBlock, id, link]);

  return (
    <div
      className="flex flex-col justify-between items-center"
      onBlur={() => {
        if (focusedBlockId === id) setFocusedBlockId(null);
      }}
    >
      <InputBox
        value={link}
        placeholder="Set a link"
        handleChange={setLink}
        onAction={handleEvent}
        buttonIcon={<ArrowUpIcon className="w-5 h-5" />}
      />

      {block.payload.content && <ViewBlock key={block.id} block={block} />}
    </div>
  );
}

export default memo(LinkBlock);
