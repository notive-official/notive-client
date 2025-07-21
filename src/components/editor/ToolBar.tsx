import { useEditor } from "@/contexts/EditorContext";
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
  const { addNewBlock, addNewBlockAfter, changeBlockType } = useEditor();
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
          focusedBlockId
            ? addNewBlockAfter(focusedBlockId, "link")
            : addNewBlock("link")
        }
      >
        <LinkIcon className="w-5 h-5 m-2" />
      </Button>
      <Button
        className="click-effect"
        onClick={() =>
          focusedBlockId
            ? addNewBlockAfter(focusedBlockId, "image")
            : addNewBlock("image")
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
              ? addNewBlockAfter(focusedBlockId, "paragraph")
              : addNewBlock("paragraph");
            setFocusedBlockId(newBlockId);
          }}
        >
          <PencilIcon className="w-5 h-5 m-2" />
        </Button>
        <div
          className={`
            flex gap-1 absolute left-full top-0 px-2
            transition-all duration-300 bg-dark-transparent-5 rounded-r-2xl
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
                ? changeBlockType(focusedBlockId, "h1")
                : addNewBlock("h1")
            }
          >
            <H1Icon className="w-5 h-5 m-2" />
          </Button>
          <Button
            className="click-effect"
            onClick={() =>
              focusedBlockId
                ? changeBlockType(focusedBlockId, "h2")
                : addNewBlock("h2")
            }
          >
            <H2Icon className="w-5 h-5 m-2" />
          </Button>
          <Button
            className="click-effect"
            onClick={() =>
              focusedBlockId
                ? changeBlockType(focusedBlockId, "h3")
                : addNewBlock("h3")
            }
          >
            <H3Icon className="w-5 h-5 m-2" />
          </Button>
          <Button
            className="click-effect"
            onClick={() =>
              focusedBlockId && changeBlockType(focusedBlockId, "paragraph")
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
