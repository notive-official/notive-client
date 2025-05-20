import { Button } from "@headlessui/react";
import { MinusCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useEditor } from "@/contexts/EditorProvider";
import useLinkUpload from "@/hooks/linkUpload";
import InputBox from "../common/InputBox";

interface LinkUploaderProps {
  id: string;
}

export default function LinkUploader({ id }: LinkUploaderProps) {
  const { handleUpdateElement } = useEditor();
  const { links, handleAddLink, handleRemoveLink } = useLinkUpload();
  const [link, setLink] = useState("");

  useEffect(() => {
    handleUpdateElement(id, { links });
  }, [links]);

  const handleIconClick = () => {
    handleAddLink(link);
    setLink("");
  };

  return (
    <div className="flex flex-col justify-between items-center">
      <InputBox
        value={link}
        placeholder="Add a link"
        handleChange={(e) => setLink(e.target.value)}
        icon={<ArrowUpCircleIcon className="w-5 h-5" />}
        handleIconClick={handleIconClick}
      />
      <div className="flex flex-col justify-between items-center w-full mb-2">
        {links.map((uploadedLink) => (
          <div
            key={uploadedLink.id}
            className="flex justify-between items-center w-full gap-2"
          >
            <div className="flex justify-between items-center bg-transparent-reverse w-full my-1 pl-4 rounded-xl underline">
              <p className="truncate">{uploadedLink.url}</p>
              <Button
                className="cursor-pointer click-effect m-2"
                onClick={() => handleRemoveLink(uploadedLink.id)}
              >
                <MinusCircleIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
