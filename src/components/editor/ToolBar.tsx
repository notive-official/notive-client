import { useEditor } from "@/contexts/EditorProvider";
import { Button } from "@headlessui/react";
import { PencilIcon, LinkIcon, PhotoIcon } from "@heroicons/react/24/solid";

export default function ToolBar() {
  const { handleAddElement } = useEditor();

  return (
    <div className="w-full flex flex-row justify-start gap-3 px-2 py-2 bg-secondary rounded-xl shadow-lg">
      <Button
        className="click-effect"
        onClick={() => {
          handleAddElement("description");
        }}
      >
        <PencilIcon className="w-5 h-5 m-2" />
      </Button>
      <Button
        className="click-effect"
        onClick={() => {
          handleAddElement("links");
        }}
      >
        <LinkIcon className="w-5 h-5 m-2" />
      </Button>
      <Button
        className="click-effect"
        onClick={() => {
          handleAddElement("images");
        }}
      >
        <PhotoIcon className="w-5 h-5 m-2" />
      </Button>
    </div>
  );
}
