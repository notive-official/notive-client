import { useBlockEditor } from "@/contexts/BlockEditorContext";
import { useFocusBlock } from "@/contexts/FocusBlockContext";
import { Button } from "@headlessui/react";
import { PencilIcon, H1Icon, LinkIcon, PhotoIcon, H2Icon, H3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function ToolBar() {
  const { addBlock, updateBlock } = useBlockEditor();
  const { focusedBlockId, setFocusedBlockId } = useFocusBlock();
  const [showHeadings, setShowHeadings] = useState(false);

  const btn = "p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-reverse-5 cursor-pointer transition-all";

  return (
    <div className="flex items-center gap-1 px-1 py-1 bg-muted rounded-xl" onMouseDown={(e) => e.preventDefault()}>
      <Button className={btn} onClick={() => focusedBlockId ? addBlock("LINK", focusedBlockId) : addBlock("LINK")}>
        <LinkIcon className="w-4 h-4" />
      </Button>
      <Button className={btn} onClick={() => focusedBlockId ? addBlock("IMAGE", focusedBlockId) : addBlock("IMAGE")}>
        <PhotoIcon className="w-4 h-4" />
      </Button>

      <div className="w-px h-5 bg-border mx-1" />

      <div className="relative flex" onMouseEnter={() => setShowHeadings(true)} onMouseLeave={() => setShowHeadings(false)}>
        <Button className={btn} onClick={() => {
          const id = focusedBlockId ? addBlock("PARAGRAPH", focusedBlockId) : addBlock("PARAGRAPH");
          setFocusedBlockId(id);
        }}>
          <PencilIcon className="w-4 h-4" />
        </Button>
        <div className={`flex gap-0.5 absolute left-full top-0 px-1 py-1 bg-muted rounded-xl transition-all duration-200
          ${showHeadings ? "opacity-100 translate-x-1" : "opacity-0 -translate-x-2 pointer-events-none"}`}>
          <Button className={btn} onClick={() => focusedBlockId ? updateBlock(focusedBlockId, { type: "H1" }) : addBlock("H1")}>
            <H1Icon className="w-4 h-4" />
          </Button>
          <Button className={btn} onClick={() => focusedBlockId ? updateBlock(focusedBlockId, { type: "H2" }) : addBlock("H2")}>
            <H2Icon className="w-4 h-4" />
          </Button>
          <Button className={btn} onClick={() => focusedBlockId ? updateBlock(focusedBlockId, { type: "H3" }) : addBlock("H3")}>
            <H3Icon className="w-4 h-4" />
          </Button>
          <Button className={btn} onClick={() => focusedBlockId && updateBlock(focusedBlockId, { type: "PARAGRAPH" })}>
            <span className="flex items-center justify-center w-4 h-4 text-xs font-serif font-bold">T</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
