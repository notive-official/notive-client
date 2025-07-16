// components/ImageUploader.tsx
"use client";

import { useCallback } from "react";
import useTrans from "@/hooks/translation";
import { EditorBlock, useEditor } from "@/contexts/EditorContext";
import { useDropzone } from "react-dropzone";

interface ImageBlockProps {
  block: EditorBlock;
}
export default function ImageBlock({ block }: ImageBlockProps) {
  const { PostTrans } = useTrans();
  const { updateBlock } = useEditor();
  const { id, payload } = block;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    updateBlock(id, { file: acceptedFiles[0] });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`
          p-3 border-2 border-dashed rounded-lg cursor-pointer my-3
          ${
            isDragActive
              ? "border-accent bg-transparent-reverse"
              : "border-primary"
          }
        `}
      >
        <input {...getInputProps()} />
        {payload.file ? (
          <p className="fg-primary">{payload.file.name}</p>
        ) : (
          <p className="fg-assistant">
            이미지를 드래그하거나 클릭하여 선택하세요 (최대 5MB)
          </p>
        )}
      </div>
    </div>
  );
}
