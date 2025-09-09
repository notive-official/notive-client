import Image from "next/image";
import path from "path";

interface ImageViewProps {
  filePath: string;
  width?: number;
  height?: number;
}

export default function ImageView({
  filePath,
  width = 100,
  height = 100,
}: ImageViewProps) {
  const fileName = path.basename(filePath);

  return (
    <div className="flex flex-col w-full h-full items-start justify-center">
      <div className="relative">
        <Image
          src={filePath}
          alt={fileName}
          width={width}
          height={height}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
}
