// components/ImageUploader.tsx
"use client";

import { useCallback } from "react";
import useTrans from "@/hooks/translation";
import { EditorBlock, useEditor } from "@/contexts/EditorContext";
import { useDropzone } from "react-dropzone";
import ViewBlock from "../viewer/ViewBlock";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { Button } from "@headlessui/react";
import { useFocusBlock } from "@/contexts/FocusBlockContext";

interface ImageBlockProps {
  block: EditorBlock;
}
export default function ImageBlock({ block }: ImageBlockProps) {
  const { PostTrans } = useTrans();
  const { updateBlock } = useEditor();
  const { focusedBlockId, setFocusedBlockId } = useFocusBlock();
  const { id, payload } = block;
  const { file } = payload;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    updateBlock(id, { file: acceptedFiles[0] });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const deleteFile = () => {
    updateBlock(id, { file: undefined });
  };

  return (
    <div>
      <div
        className="flex flex-row items-center justify-center gap-2"
        onBlur={() => {
          if (focusedBlockId === id) setFocusedBlockId(null);
        }}
      >
        <div
          {...getRootProps()}
          className="w-full p-3 border-2 border-dashed rounded-lg cursor-pointer my-3 border-primary bg-tertiary shadow-md"
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="fg-primary">{file.name}</p>
          ) : (
            <p className="fg-assistant">파일 선택 (최대 5MB)</p>
          )}
        </div>
      </div>
      {file && <ViewBlock key={block.id} block={block} />}
    </div>
  );
}
