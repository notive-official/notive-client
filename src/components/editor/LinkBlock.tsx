import { ArrowUpIcon } from "@heroicons/react/16/solid";
import { useCallback, useState, memo } from "react";
import { EditorBlock, useBlockEditor } from "@/contexts/BlockEditorContext";
import InputBox from "../common/InputBox";
import ViewBlock from "../viewer/BlockView";
import { useFocusBlock } from "@/contexts/FocusBlockContext";
import useTranslation from "@/hooks/useTranslation";
import { isValidHttpUrl } from "@/common/utils";
import { useErrorBar } from "@/contexts/ErrorBarContext";

interface LinkBlockProps {
  block: EditorBlock;
}

export function LinkBlock({ block }: LinkBlockProps) {
  const { updateBlock } = useBlockEditor();
  const { focusedBlockId, setFocusedBlockId } = useFocusBlock();
  const { PostTrans } = useTranslation();
  const { pushWarning } = useErrorBar();
  const [link, setLink] = useState("");
  const { id } = block;

  const handleEvent = useCallback(() => {
    if (!isValidHttpUrl(link)) {
      return pushWarning("Invalid Url");
    }
    updateBlock(id, { payload: { content: link.trim() } });
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
        placeholder={PostTrans("block.link.placeholder")}
        handleChange={setLink}
        onAction={handleEvent}
        buttonIcon={<ArrowUpIcon className="w-5 h-5" />}
      />

      {block.payload.content && (
        <ViewBlock
          key={block.id}
          block={{ ...block, payload: block.payload.content }}
        />
      )}
    </div>
  );
}

export default memo(LinkBlock);
