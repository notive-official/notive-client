import {
  DEFAULT_ARCHIVE_THUMBNAIL_PATH,
  DEFAULT_PROFILE_PATH,
} from "@/common/consts/defaultImage";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";

interface CardProps {
  id: string;
  title: string;
  writer: {
    nickname: string;
    profileImagePath: string | null;
  };
  thumbnailPath: string | null;
}

export default function MainCard({
  id,
  title,
  writer,
  thumbnailPath,
}: CardProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/post/${id}`);
  };
  return (
    <div className="flex flex-col w-auto cursor-pointer" onClick={handleClick}>
      {/* 썸네일: 높이 통일, 가로는 이미지 비율에 맞춤 */}
      <div className="relative group rounded hover:drop-shadow-lg shadow-sm">
        <Image
          src={thumbnailPath ?? DEFAULT_ARCHIVE_THUMBNAIL_PATH}
          alt={title}
          width={20}
          height={20}
          priority
          className="object-cover w-auto h-[200px] rounded bg-white"
        />
        <p className="absolute bottom-2 right-2 bg-black/75 text-white py-1 px-2 rounded-full flex flex-row gap-1 text-sm opacity-0 transition group-hover:opacity-100">
          <Image
            src={writer.profileImagePath ?? DEFAULT_PROFILE_PATH}
            alt={writer.nickname}
            width={20}
            height={20}
            priority
            className="object-cover"
          />
          {writer.nickname}
        </p>
      </div>
      {/* 제목 */}
      <div className="flex flex-col gap-1 p-2">
        <h3 className="w-full text-foreground text-md text-start">{title}</h3>
      </div>
    </div>
  );
}
