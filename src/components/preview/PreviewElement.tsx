"use client";

import { Button } from "@headlessui/react";
import { useState } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/16/solid";
import { EditorElementContent, useEditor } from "@/contexts/EditorProvider";
import Image from "next/image";

interface EditorElementProps {
  element: EditorElementContent;
}

export default function PreviewElement({ element }: EditorElementProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="space-y-4 my-4 rounded-xl w-full">
      {element.elementCategory === "images" &&
      element.data.uploadedFiles.length > 0 ? (
        <div className="relative w-full aspect-video overflow-hidden px-[10%]">
          <div
            className="flex h-full transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {element.data.uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex-shrink-0 w-full h-full relative rounded-xl overflow-hidden"
              >
                <Image
                  src={file.preview}
                  alt="preview"
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          {element.data.uploadedFiles.length > 1 && (
            <>
              <Button
                onClick={() =>
                  setCurrentIndex(
                    (currentIndex - 1 + element.data.uploadedFiles.length) %
                      element.data.uploadedFiles.length
                  )
                }
                className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full p-1 cursor-pointer click-effect"
              >
                <ArrowLeftCircleIcon className="h-6 w-6" />
              </Button>
              <Button
                onClick={() =>
                  setCurrentIndex(
                    (currentIndex + 1) % element.data.uploadedFiles.length
                  )
                }
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full p-1 cursor-pointer click-effect"
              >
                <div className="w-full h-full px-0.2 py-0.2 bg-primary rounded-full">
                  <ArrowRightCircleIcon className="h-6 w-6" />
                </div>
              </Button>
            </>
          )}
        </div>
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
