import Image from "next/image";
import { ArrowDownTrayIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

interface ImageViewProps {
  file: File;
  downloadable?: boolean;
}

export default function ImageView({
  file,
  downloadable = false,
}: ImageViewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col w-full h-full items-end justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {downloadable ? (
          <a
            href={URL.createObjectURL(file)}
            download={file.name}
            className={`cursor-pointer absolute rounded-lg ${
              isHovered
                ? "bg-reverse hover-outline-effect-reverse"
                : "bg-transparent"
            }`}
          >
            <ArrowDownTrayIcon
              className={`w-5 h-5 m-1 ${
                isHovered ? "fg-reverse" : "text-transparent"
              }`}
            />
          </a>
        ) : null}
        <Image
          src={URL.createObjectURL(file)}
          alt={file.name}
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
}
