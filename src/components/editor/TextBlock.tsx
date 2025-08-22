import { EditorBlock, useBlockEditor } from "@/contexts/BlockEditorContext";
import { useEffect, useRef, useState } from "react";
import { Field, Textarea } from "@headlessui/react";
import { useFocusBlock } from "@/contexts/FocusBlockContext";
import useTranslation from "@/hooks/useTranslation";

interface TextBlockProps {
  block: EditorBlock;
}

export default function TextBlock({ block }: TextBlockProps) {
  const { updateBlock, addNewBlockAfter, getPrevTextBlock, getNextTextBlock } =
    useBlockEditor();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { focusedBlockId, setFocusedBlockId } = useFocusBlock();
  const { mergeWithPrevBlock } = useBlockEditor();
  const { PostTrans } = useTranslation();

  const { id, type: blockType, payload } = block;

  const [isComposing, setIsComposing] = useState(false);

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [blockType, payload.content]);

  useEffect(() => {
    if (focusedBlockId === id && inputRef.current) {
      const { selectionStart, selectionEnd } = inputRef.current;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(selectionStart, selectionEnd);
    }
  }, [focusedBlockId, id]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComposing) return;
    if (inputRef.current) {
      const { selectionStart, selectionEnd, value } = inputRef.current;
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const before = value.slice(0, selectionStart);
        const after = value.slice(selectionEnd);

        updateBlock(id, { content: before });
        const newBlockId = addNewBlockAfter(id, "PARAGRAPH");
        updateBlock(newBlockId, { content: after });
        setFocusedBlockId(newBlockId);
      }
      if (e.key === "Backspace" && !e.shiftKey) {
        if (selectionStart === 0 && selectionEnd === 0) {
          e.preventDefault();
          const prevBlock = getPrevTextBlock(id);
          if (!prevBlock) return;
          mergeWithPrevBlock(id);
          setTimeout(() => {
            setFocusedBlockId(prevBlock.id);
          });
        }
      }
    }
    if (e.key === "ArrowDown") {
      const nextBlock = getNextTextBlock(id);
      if (!nextBlock) return;
      setFocusedBlockId(nextBlock.id);
    }
    if (e.key === "ArrowUp") {
      const prevBlock = getPrevTextBlock(id);
      if (!prevBlock) return;
      setFocusedBlockId(prevBlock.id);
    }
  };

  return (
    <div className="w-full">
      <Field>
        <Textarea
          ref={inputRef}
          value={payload.content}
          className={`${blockType === "PARAGRAPH" && "text-normal"}
          ${blockType === "H1" && "text-4xl font-extrabold"}
          ${blockType === "H2" && "text-2xl font-bold"}
          ${blockType === "H3" && "text-xl font-semibold"} 
          block w-full resize-none rounded-lg border-none bg-transparent px-3 py-1.5 text-foreground data-focus:outline-none`}
          rows={1}
          placeholder={
            id === focusedBlockId ? PostTrans("block.text.placeholder") : ""
          }
          onChange={(e) => updateBlock(id, { content: e.target.value })}
          onFocus={() => setFocusedBlockId(id)}
          onBlur={() => {
            if (focusedBlockId === id) setFocusedBlockId(null);
          }}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onKeyDown={handleKeyDown}
        />
      </Field>
    </div>
  );
}
