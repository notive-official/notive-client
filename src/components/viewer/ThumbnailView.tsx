import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import Modal from "../common/Modal";

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
  const { open, modalBind } = useModal();
  return (
    <>
      <Modal
        {...modalBind}
        title={""}
        className="max-w-2xl"
        actionNode={
          <Image
            src={thumbnailPath}
            alt={"Thumbnail"}
            width={width * 2}
            height={height * 2}
            className={`object-cover w-full h-auto rounded bg-white`}
          />
        }
      />
      <div
        className="relative w-fit h-fit drop-shadow-lg cursor-pointer"
        onClick={() => open()}
      >
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
    </>
  );
}
