"use client";

import { EditorElementContent } from "@/contexts/EditorProvider";
import Image from "next/image";
import Carousel from "../common/Carousel";

interface EditorElementProps {
  element: EditorElementContent;
}

export default function PreviewElement({ element }: EditorElementProps) {
  return (
    <div className="space-y-4 my-4 rounded-xl w-full">
      {element.elementCategory === "images" &&
      element.data.uploadedFiles.length > 0 ? (
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
      ) : null}
      {element.elementCategory === "links" ? (
        element.data.links.map((link) => (
          <div key={link.id}>
            <a href={link.link} target="_blank">
              {link.link}
            </a>
          </div>
        ))
      ) : (
        <div className="py-5 rounded-xl">{element.data.description}</div>
      )}
    </div>
  );
}
