import Image from "next/image";
import { ArrowDownTrayIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import path from "path";

interface ImageViewProps {
  filePath: string;
  downloadable?: boolean;
}

export default function ImageView({
  filePath,
  downloadable = false,
}: ImageViewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const fileName = path.basename(filePath);

  return (
    <div
      className="flex flex-col w-full h-full items-start justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {downloadable ? (
          <a
            href={filePath}
            download={fileName}
            className={`cursor-pointer absolute left-0 top-0 rounded-xl m-2 z-10 ${
              isHovered
                ? "bg-dark-transparent-75 hover:outline-light-transparent-50 hover:outline-2 hover:-outline-offset-2"
                : "bg-transparent"
            }`}
          >
            <ArrowDownTrayIcon
              className={`w-5 h-5 m-1 ${
                isHovered ? "text-light-primary" : "text-transparent"
              }`}
            />
          </a>
        ) : null}
        <Image
          src={filePath}
          alt={fileName}
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
}
