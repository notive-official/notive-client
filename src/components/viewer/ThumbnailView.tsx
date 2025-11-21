import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import Modal from "../common/Modal";
import useTranslation from "@/hooks/useTranslation";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import { useCallback } from "react";

interface ThumbnailViewProps {
  thumbnailPath: string;
  referenceUrl?: string;
  width?: number;
  height?: number;
}

export default function ThumbnailView({
  thumbnailPath,
  referenceUrl,
  width = 600,
  height = 600,
}: ThumbnailViewProps) {
  const { ViewTrans } = useTranslation();

  const handleThumbnailClick = useCallback(() => {
    if (referenceUrl)
      window.open(
        referenceUrl,
        "myPopup",
        "width=800,height=600,toolbar=no,menubar=no,scrollbars=yes"
      );
  }, [referenceUrl]);
  return (
    <>
      <div
        className="relative group cursor-pointer rounded drop-shadow-lg w-full h-fit"
        onClick={handleThumbnailClick}
      >
        <Image
          src={thumbnailPath}
          alt={"Thumbnail"}
          width={width * 2}
          height={height * 2}
          className={`object-cover w-full h-auto rounded bg-white`}
        />
        {referenceUrl && (
          <p className="absolute bottom-2 right-2 bg-black/75 text-white py-1 px-2 rounded-full flex flex-row gap-1 text-sm opacity-0 transition group-hover:opacity-100">
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            {ViewTrans("link.visit")}
          </p>
        )}
      </div>
    </>
  );
}
