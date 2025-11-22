import {
  DEFAULT_ARCHIVE_THUMBNAIL_PATH,
  DEFAULT_PROFILE_PATH,
} from "@/common/consts/defaultImage";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";
import { useState } from "react";

interface CardProps {
  id: string;
  title: string;
  writer: {
    nickname: string;
    profileImagePath: string | null;
  };
  content: string;
  thumbnailPath: string | null;
}

export default function NoteCard({
  id,
  title,
  writer,
  content,
  thumbnailPath,
}: CardProps) {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/post/${id}`);
  };
  return (
    <div
      className="grid grid-rows-1 lg:grid-cols-2 shadow-md bg-surface p-2 gap-2 rounded-md cursor-pointer w-full 
      max-w-[300px] lg:max-w-[720px] hover-bg-effect overflow-hidden"
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="hidden lg:flex flex-col 2xl:flex-row gap-4 2xl:gap-8 lg:p-4 2xl:p-8">
        {/* 제목 */}
        <div className="flex w-full 2xl:w-2/5">
          <h3 className="w-full text-foreground font-bold text-md text-start line-clamp-1">
            {title}
          </h3>
        </div>

        {/* 내용 */}
        <div className="flex flex-col 2xl:w-3/5 h-full gap-3">
          <div className="text-muted-foreground text-sm line-clamp-2 xl:line-clamp-3 2xl:line-clamp-6">
            {content}
          </div>
        </div>
      </div>

      {/* 썸네일: 고정 비율로 통일 */}
      <div className="relative w-full aspect-[4/3] drop-shadow-md">
        <Image
          src={thumbnailPath ?? DEFAULT_ARCHIVE_THUMBNAIL_PATH}
          alt={title}
          fill
          className="object-cover bg-white"
          sizes="(min-width: 1024px) 360px, 100vw"
        />
        {hover && (
          <p className="absolute bottom-2 right-2 bg-black/75 text-white py-1 px-2 rounded-full flex flex-row gap-1 text-sm">
            <Image
              src={writer.profileImagePath ?? DEFAULT_PROFILE_PATH}
              alt={writer.nickname}
              width={20}
              height={20}
              className="object-cover"
            />
            {writer.nickname}
          </p>
        )}
      </div>
      <div className="flex lg:hidden w-full 2xl:w-2/5">
        <h3 className="w-full text-foreground font-bold text-md text-start px-2 line-clamp-1">
          {title}
        </h3>
      </div>
    </div>
  );
}
