import Image from "next/image";
import useTranslation from "@/hooks/useTranslation";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import { useCallback } from "react";

interface ThumbnailViewProps { thumbnailPath: string; referenceUrl?: string }

export default function ThumbnailView({ thumbnailPath, referenceUrl }: ThumbnailViewProps) {
  const { ViewTrans } = useTranslation();
  const handleClick = useCallback(() => {
    if (referenceUrl) window.open(referenceUrl, "_blank", "width=900,height=700,scrollbars=yes");
  }, [referenceUrl]);

  return (
    <div className={`relative group rounded-lg overflow-hidden bg-muted ${referenceUrl ? "cursor-pointer" : ""}`} onClick={handleClick}>
      <Image src={thumbnailPath} alt="Thumbnail" width={1280} height={720} className="w-full h-auto object-cover" />
      {referenceUrl && (
        <span className="absolute bottom-2 right-2 bg-black/50 backdrop-blur text-white py-1 px-2 rounded-full flex items-center gap-1 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowTopRightOnSquareIcon className="w-3 h-3" />{ViewTrans("link.visit")}
        </span>
      )}
    </div>
  );
}
