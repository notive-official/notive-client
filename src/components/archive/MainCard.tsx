import { DEFAULT_ARCHIVE_THUMBNAIL_PATH, DEFAULT_PROFILE_PATH } from "@/common/consts/defaultImage";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";

interface CardProps {
  id: string;
  title: string;
  writer: { nickname: string; profileImagePath: string | null };
  thumbnailPath: string | null;
}

export default function MainCard({ id, title, writer, thumbnailPath }: CardProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col cursor-pointer group" onClick={() => router.push(`/post/${id}`)}>
      <div className="relative overflow-hidden rounded-xl bg-muted aspect-[4/3]">
        <Image src={thumbnailPath ?? DEFAULT_ARCHIVE_THUMBNAIL_PATH} alt={title} fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          sizes="(min-width:1024px) 25vw,(min-width:640px) 33vw,50vw" />
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug whitespace-normal">{title}</h3>
        <div className="flex items-center gap-2">
          <Image src={writer.profileImagePath ?? DEFAULT_PROFILE_PATH} alt={writer.nickname} width={20} height={20} className="rounded-full object-cover" />
          <span className="text-xs text-muted-foreground">{writer.nickname}</span>
        </div>
      </div>
    </div>
  );
}
