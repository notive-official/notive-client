import Image from "next/image";

interface ThumbnailViewProps {
  thumbnailPath: string;
  width?: number;
  height?: number;
}

export default function ThumbnailView({
  thumbnailPath,
  width = 600,
  height = 600,
}: ThumbnailViewProps) {
  return (
    <div className="relative w-fit h-fit drop-shadow-lg cursor-pointer">
      <Image
        src={thumbnailPath}
        alt={"Thumbnail"}
        width={width}
        height={height}
        className={`object-cover w-[${width}px] ${
          height ? "h-[" + height + "]" : "h-auto"
        } rounded bg-white`}
      />
    </div>
  );
}
