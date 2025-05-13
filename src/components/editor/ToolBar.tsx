import { useEditor } from "@/contexts/EditorProvider";
import { Button } from "@headlessui/react";
import { PencilIcon, LinkIcon, PhotoIcon } from "@heroicons/react/24/solid";

export default function ToolBar() {
  const { handleAddElement } = useEditor();

  return (
    <div className="w-full flex flex-row justify-start gap-3 px-2 py-2 bg-secondary rounded-xl shadow-lg">
      <div
        className="flex flex-row px-2 py-2 hover-bg-effect rounded-xl cursor-pointer"
        onClick={() => {
          handleAddElement("description");
        }}
      >
        <Button className="click-effect cursor-pointer">
          <PencilIcon className="w-5 h-5" />
        </Button>
      </div>
      <div
        className="flex flex-row px-2 py-2 hover-bg-effect rounded-xl cursor-pointer"
        onClick={() => {
          handleAddElement("links");
        }}
      >
        <Button className="click-effect cursor-pointer">
          <LinkIcon className="w-5 h-5" />
        </Button>
      </div>
      <div
        className="flex flex-row px-2 py-2 hover-bg-effect rounded-xl cursor-pointer"
        onClick={() => {
          handleAddElement("images");
        }}
      >
        <Button className="click-effect cursor-pointer">
          <PhotoIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
