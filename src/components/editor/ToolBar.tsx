import { useBlockEditor } from "@/contexts/BlockEditorContext";
import { useFocusBlock } from "@/contexts/FocusBlockContext";
import { Button } from "@headlessui/react";
import {
  PencilIcon,
  H1Icon,
  LinkIcon,
  PhotoIcon,
  H2Icon,
  H3Icon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

export default function ToolBar() {
  const { addBlock, updateBlock } = useBlockEditor();
  const { focusedBlockId, setFocusedBlockId } = useFocusBlock();
  const [showHeadings, setShowHeadings] = useState(false);

  return (
    <div
      className="w-full flex flex-row justify-start gap-3 px-2 py-2 bg-secondary rounded-xl shadow-lg"
      onMouseDown={(e) => e.preventDefault()}
    >
      <Button
        className="click-effect"
        onClick={() =>
          focusedBlockId ? addBlock("LINK", focusedBlockId) : addBlock("LINK")
        }
      >
        <LinkIcon className="w-5 h-5 m-2" />
      </Button>
      <Button
        className="click-effect"
        onClick={() =>
          focusedBlockId ? addBlock("IMAGE", focusedBlockId) : addBlock("IMAGE")
        }
      >
        <PhotoIcon className="w-5 h-5 m-2" />
      </Button>
      <div
        className="relative flex"
        onMouseEnter={() => setShowHeadings(true)}
        onMouseLeave={() => setShowHeadings(false)}
      >
        <Button
          className="click-effect"
          onClick={() => {
            const newBlockId = focusedBlockId
              ? addBlock("PARAGRAPH", focusedBlockId)
              : addBlock("PARAGRAPH");
            setFocusedBlockId(newBlockId);
          }}
        >
          <PencilIcon className="w-5 h-5 m-2" />
        </Button>
        <div
          className={`
            flex gap-1 absolute left-full top-0 px-2
            transition-all duration-300 bg-reverse-5 rounded-r-2xl
            ${
              showHeadings
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4 pointer-events-none"
            }
          `}
        >
          <Button
            className="click-effect"
            onClick={() =>
              focusedBlockId
                ? updateBlock(focusedBlockId, { type: "H1" })
                : addBlock("H1")
            }
          >
            <H1Icon className="w-5 h-5 m-2" />
          </Button>
          <Button
            className="click-effect"
            onClick={() =>
              focusedBlockId
                ? updateBlock(focusedBlockId, { type: "H2" })
                : addBlock("H2")
            }
          >
            <H2Icon className="w-5 h-5 m-2" />
          </Button>
          <Button
            className="click-effect"
            onClick={() =>
              focusedBlockId
                ? updateBlock(focusedBlockId, { type: "H3" })
                : addBlock("H3")
            }
          >
            <H3Icon className="w-5 h-5 m-2" />
          </Button>
          <Button
            className="click-effect"
            onClick={() =>
              focusedBlockId &&
              updateBlock(focusedBlockId, { type: "PARAGRAPH" })
            }
          >
            <div className="flex items-center justify-center w-5 h-5 m-2 text-xl font-serif">
              T
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
