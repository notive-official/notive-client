"use client";

import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import { XMarkIcon, EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import TextAreaBox from "../common/TextAreaBox";
import ImageUploader from "./ImageUploader";
import LinkUploader from "./LinkUploader";
import { EditorElementContent, useEditor } from "@/contexts/EditorProvider";
import { useSortableElement } from "@/contexts/SortableElementContext";

interface EditorElementProps {
  element: EditorElementContent;
}

export default function EditorElement({ element }: EditorElementProps) {
  const { handleRemoveElement } = useEditor();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: element.id });
  const { isActive } = useSortableElement();
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [description, setDescription] = useState("");
  const { handleUpdateElement } = useEditor();

  useEffect(() => {
    handleUpdateElement(element.id, {
      description: description,
    });
  }, [description]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`space-y-4 my-4 p-5 rounded-xl ${
        isActive(element.id) ? "bg-secondary" : "bg-tertiary"
      }`}
    >
      <div className="flex justify-end relative">
        <Button
          {...attributes}
          {...listeners}
          className="flex absolute left-1/2 -top-3 transform -translate-x-1/2 justify-center items-center cursor-pointer w-20 right-auto click-effect"
        >
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
        <div className="flex flex-row gap-2">
          <ImageUploader id={element.id} />
          <TextAreaBox
            placeholder="Add a description"
            handleChange={(e) => setDescription(e.target.value)}
            inputClassName="bg-transparent-reverse"
            rows={1}
            scrollable={false}
          />
        </div>
      ) : null}

      {element.elementCategory === "links" ? (
        <LinkUploader id={element.id} />
      ) : null}

      {element.elementCategory === "description" ? (
        <TextAreaBox
          placeholder="Add a description"
          handleChange={(e) => setDescription(e.target.value)}
          inputClassName="bg-transparent-reverse"
          rows={4}
          scrollable={false}
        />
      ) : null}
    </div>
  );
}
