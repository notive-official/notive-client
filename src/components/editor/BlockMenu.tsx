import { EditorBlock, useEditor } from "@/contexts/EditorContext";
import { useSortableElement } from "@/contexts/SortableElementContext";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";

export default function BlockMenu({ block }: { block: EditorBlock }) {
  const { isClicked, clickedId } = useSortableElement();
  const { removeBlock } = useEditor();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  useEffect(() => {
    if (isClicked(block.id)) {
      setMenuOpen(!menuOpen);
    }
  }, [clickedId]);

  return (
    menuOpen && (
      <div
        ref={menuRef}
        className="absolute left-0 mt-2 w-32 origin-top-left rounded-lg border border-gray-200 bg-white p-1 text-sm shadow-lg z-10"
      >
        <button
          onClick={() => {
            removeBlock(block.id);
            setMenuOpen(false);
          }}
          className="group flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-primay hover:bg-black/5 transition-colors"
        >
          <XMarkIcon className="w-4 h-4" />
          삭제
        </button>
      </div>
    )
  );
}
