import { ReactNode, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  button: ReactNode;
  handleFileChange: (_file: File) => void;
}

export default function ImageUploader({
  button,
  handleFileChange,
}: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFileChange(acceptedFiles[0]);
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
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {button}
      </div>
    </div>
  );
}
