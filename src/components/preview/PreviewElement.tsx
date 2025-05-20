"use client";

import { EditorElementType } from "@/contexts/EditorProvider";
import Image from "next/image";
import Carousel from "../common/Carousel";
import TextPreview from "./TextPreview";
import LinkPreview from "./LinkPreview";

interface EditorElementProps {
  element: EditorElementType;
}

export default function PreviewElement({ element }: EditorElementProps) {
  return (
    <div className="space-y-2 rounded-xl w-full p-4">
      {element.elementCategory === "image" &&
      element.data.uploadedFiles.length > 0 ? (
        <div>
          <Carousel
            nodes={element.data.uploadedFiles.map((file) => (
              <Image
                key={file.id}
                src={file.preview}
                alt="preview"
                fill
                className="object-contain"
              />
            ))}
          />
          {element.data.description.split("\n").map((text, index) => {
            return (
              <div key={index} className="fg-assistant text-center m-2">
                {text}
              </div>
            );
          })}
        </div>
      ) : null}
      <div className="flex flex-col gap-4">
        {element.elementCategory === "link"
          ? element.data.links.map((link) => (
              <LinkPreview key={link.id} upLoadedLink={link} />
            ))
          : null}
      </div>
      {element.elementCategory === "text" ? (
        <TextPreview text={element.data.text.value} />
      ) : null}
    </div>
  );
}
