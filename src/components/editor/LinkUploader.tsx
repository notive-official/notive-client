import { Button } from "@headlessui/react";
import TextAreaBox from "../TextAreaBox";
import { PlusIcon, MinusCircleIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";
import { useEditor } from "@/contexts/EditorProvider";
import useLinkUpload from "@/hooks/linkUpload";

interface LinkUploaderProps {
  id: string;
}

export default function LinkUploader({ id }: LinkUploaderProps) {
  const { handleUpdateElement } = useEditor();
  const { links, handleChange, handleAddLink, handleRemoveLink } =
    useLinkUpload();

  useEffect(() => {
    handleUpdateElement(id, { links });
  }, [links]);

  return (
    <div className="flex flex-col justify-between items-center">
      {links.map((uploadedLink) => (
        <div
          key={uploadedLink.id}
          className="flex justify-between items-center w-full gap-2"
        >
          <TextAreaBox
            value={uploadedLink.link}
            placeholder="Add a link"
            handleChange={(e) => handleChange(uploadedLink.id, e.target.value)}
            inputClassName="bg-transparent-reverse w-full"
            rows={1}
          />
          <Button
            className="cursor-pointer click-effect"
            onClick={() => handleRemoveLink(uploadedLink.id)}
          >
            <div className="w-full h-full px-0.2 py-0.2 bg-primary rounded-full">
              <MinusCircleIcon className="w-5 h-5" />
            </div>
          </Button>
        </div>
      ))}
      <Button
        onClick={handleAddLink}
        className="flex justify-center items-center cursor-pointer w-full hover:shadow-lg bg-transparent-reverse py-1 rounded-lg"
      >
        <PlusIcon className="w-3 h-3" />
      </Button>
    </div>
  );
}
