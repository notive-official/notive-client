import { EditorBlock, useEditor } from "@/contexts/EditorContext";
import { useEffect, useRef } from "react";
import { Field, Textarea } from "@headlessui/react";
import { useFocusBlock } from "@/contexts/FocusBlockContext";

interface TextBlockProps {
  block: EditorBlock;
}

export default function TextBlock({ block }: TextBlockProps) {
  const {
    updateBlock,
    addNewBlockAfter,
    getPrevTextBlockId,
    getNextTextBlockId,
  } = useEditor();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { focusedBlockId, setFocusedBlockId } = useFocusBlock();
  const { removeBlock } = useEditor();
  const { id, type: blockType, payload } = block;
  const { content } = payload;

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  // 포커스가 돌아올 때 커서 위치 복원
  useEffect(() => {
    if (focusedBlockId === id && inputRef.current) {
      const { selectionStart, selectionEnd } = inputRef.current;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(selectionStart, selectionEnd);
    }
  }, [focusedBlockId, id]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (inputRef.current) {
      const { selectionStart, selectionEnd, value } = inputRef.current;
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const before = value.slice(0, selectionStart);
        const after = value.slice(selectionEnd);

        updateBlock(id, { content: before });
        const newBlockId = addNewBlockAfter(id, "text");
        updateBlock(newBlockId, { content: after });
        setFocusedBlockId(newBlockId);
      }
      if (e.key === "Backspace" && !e.shiftKey) {
        if (selectionStart === 0 && selectionEnd === 0) {
          const prevBlockId = getPrevTextBlockId(id);
          setFocusedBlockId(prevBlockId);
          removeBlock(id);
        }
      }
    }
    if (e.key === "ArrowDown") {
      const prevBlockId = getNextTextBlockId(id);
      setFocusedBlockId(prevBlockId);
    }
    if (e.key === "ArrowUp") {
      const nextBlockId = getPrevTextBlockId(id);
      setFocusedBlockId(nextBlockId);
    }
  };

  return (
    <div className="w-full">
      <Field>
        <Textarea
          ref={inputRef}
          value={content}
          className={`${blockType === "text" && "text-normal"}
          ${blockType === "h1" && "text-h1"}
          ${blockType === "h2" && "text-h2"}
          ${blockType === "h3" && "text-h3"} 
          block w-full resize-none rounded-lg border-none bg-transparent px-3 py-1.5 fg-principal data-focus:outline-none`}
          rows={1}
          onInput={handleInput}
          onChange={(e) => updateBlock(id, { content: e.target.value })}
          onFocus={() => setFocusedBlockId(id)}
          onKeyDown={handleKeyDown}
        />
      </Field>
    </div>
  );
}
