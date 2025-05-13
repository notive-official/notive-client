"use client";

import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import { XMarkIcon, EllipsisHorizontalIcon } from "@heroicons/react/16/solid";

import TextAreaBox from "../TextAreaBox";
import ImageUploader from "./ImageUploader";
import LinkUploader from "./LinkUploader";
import { EditorElementContent, useEditor } from "@/contexts/EditorProvider";

interface EditorElementProps {
  element: EditorElementContent;
}

export default function EditorElement({ element }: EditorElementProps) {
  const { handleRemoveElement } = useEditor();
  const [description, setDescription] = useState("");
  const { handleUpdateElement } = useEditor();

  useEffect(() => {
    handleUpdateElement(element.id, {
      description: description,
    });
  }, [description]);

  return (
    <div className="space-y-4 my-4 p-5 bg-tertiary rounded-xl">
      <div className="flex justify-end relative">
        <Button className="flex absolute left-1/2 -top-3 transform -translate-x-1/2 justify-center items-center cursor-pointer w-20 right-auto click-effect">
          <EllipsisHorizontalIcon className="w-6 h-6" />
        </Button>
        <Button
          className="cursor-pointer click-effect"
          onClick={() => handleRemoveElement(element.id)}
        >
          <XMarkIcon className="w-6 h-6" />
        </Button>
      </div>
      {element.elementCategory === "images" ? (
        <ImageUploader id={element.id} />
      ) : null}

      {element.elementCategory === "links" ? (
        <LinkUploader id={element.id} />
      ) : (
        <TextAreaBox
          placeholder="Add a description"
          handleChange={(e) => setDescription(e.target.value)}
          inputClassName="bg-transparent-reverse"
        />
      )}
    </div>
  );
}
