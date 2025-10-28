// components/ImageUploader.tsx
"use client";

import { useCallback } from "react";
import { EditorBlock, useBlockEditor } from "@/contexts/BlockEditorContext";
import { useDropzone } from "react-dropzone";
import ViewBlock from "../viewer/BlockView";
import { useFocusBlock } from "@/contexts/FocusBlockContext";
import useTranslation from "@/hooks/useTranslation";

interface ImageBlockProps {
  block: EditorBlock;
}
export default function ImageBlock({ block }: ImageBlockProps) {
  const { updateBlock } = useBlockEditor();
  const { focusedBlockId, setFocusedBlockId } = useFocusBlock();
  const { PostTrans } = useTranslation();
  const { id, payload } = block;
  const { file } = payload;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    updateBlock(id, {
      payload: {
        content: URL.createObjectURL(acceptedFiles[0]),
        file: acceptedFiles[0],
      },
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
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
        className="flex flex-row items-center justify-center gap-2"
        onBlur={() => {
          if (focusedBlockId === id) setFocusedBlockId(null);
        }}
      >
        <div
          {...getRootProps()}
          className="w-full p-3 border-2 border-dashed rounded-lg cursor-pointer my-3 border-primary bg-secondary shadow-md"
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-muted-foreground">{file.name}</p>
          ) : (
            <p className="text-muted-foreground">
              {PostTrans("block.image.placeholder")}
            </p>
          )}
        </div>
      </div>
      {block.payload.content.length > 0 && (
        <ViewBlock
          key={block.id}
          block={{
            ...block,
            payload: block.payload.content,
          }}
        />
      )}
    </div>
  );
}
