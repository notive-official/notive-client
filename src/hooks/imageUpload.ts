import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { nanoid } from "nanoid";

export interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}

export const useImageUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const mapped = acceptedFiles.map((file) => ({
      id: nanoid(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...mapped]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true,
  });

  const deleteImage = async (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  return { files, getRootProps, getInputProps, isDragActive, deleteImage };
};
