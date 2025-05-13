// components/ImageUploader.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import useTrans from "@/hooks/translation";
import { Button } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { useEditor } from "@/contexts/EditorProvider";
import { useImageUpload } from "@/hooks/imageUpload";

export default function ImageUploader({ id }: { id: string }) {
  const { PostTrans } = useTrans();
  const { handleUpdateElement } = useEditor();
  const { files, getRootProps, getInputProps, isDragActive, deleteImage } =
    useImageUpload();

  useEffect(() => {
    handleUpdateElement(id, {
      uploadedFiles: files,
    });
  }, [files]);

  return (
    <div>
      <div
        {...getRootProps()}
        className={`
          p-6 border-2 border-dashed rounded-lg cursor-pointer my-3
          ${
            isDragActive
              ? "border-blue-500 bg-transparent-reverse"
              : "border-gray-300"
          }
        `}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>여기로 이미지를 드래그하세요…</p>
        ) : (
          <p>이미지를 드래그하거나 클릭하여 선택하세요 (최대 5MB)</p>
        )}
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {files.map(({ preview, file, id }) => (
            <div key={id} className="relative">
              <Image
                src={preview}
                alt={file.name}
                width={100}
                height={100}
                className="w-full h-32 object-cover rounded-xl"
              />
              <p className="mt-2 text-sm fg-assistant truncate">{file.name}</p>
              <Button
                onClick={() => deleteImage(id)}
                className="cursor-pointer absolute -top-1.5 -right-2 text-xs click-effect rounded-full shadow"
              >
                <div className="w-full h-full px-0.2 py-0.2 bg-primary rounded-full">
                  <XCircleIcon className="w-6 h-6" />
                </div>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
