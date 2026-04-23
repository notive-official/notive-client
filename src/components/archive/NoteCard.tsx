import { DEFAULT_ARCHIVE_THUMBNAIL_PATH, DEFAULT_PROFILE_PATH } from "@/common/consts/defaultImage";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";

interface CardProps {
  id: string;
  title: string;
  writer: { nickname: string; profileImagePath: string | null };
  content: string;
  thumbnailPath: string | null;
}

export default function NoteCard({ id, title, writer, content, thumbnailPath }: CardProps) {
  const router = useRouter();
  return (
    <div
      className="group flex items-stretch border border-border rounded-xl cursor-pointer overflow-hidden hover:border-ring hover:shadow-sm transition-all duration-200"
      onClick={() => router.push(`/post/${id}`)}
    >
      <div className="flex flex-col justify-center gap-2 p-5 md:p-6 flex-1 min-w-0">
        <h3 className="text-base font-semibold text-foreground line-clamp-2 leading-snug">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 whitespace-normal break-words">{content}</p>
        <div className="flex items-center gap-2 mt-1">
          <Image src={writer.profileImagePath ?? DEFAULT_PROFILE_PATH} alt={writer.nickname} width={20} height={20} className="rounded-full object-cover" />
          <span className="text-xs text-muted-foreground">{writer.nickname}</span>
        </div>
      </div>
      <div className="relative w-36 md:w-48 shrink-0">
        <Image src={thumbnailPath ?? DEFAULT_ARCHIVE_THUMBNAIL_PATH} alt={title} fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500" sizes="192px" />
      </div>
    </div>
  );
}
