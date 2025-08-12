import Image from "next/image";

interface CardProps {
  title: string;
  name: string;
  content: string;
  thumbnailUrl: string;
}

export default function NoteCard({
  title,
  name,
  content,
  thumbnailUrl,
}: CardProps) {
  const handleClick = () => {};
  return (
    <div
      className="grid grid-rows-1 lg:grid-cols-2 shadow-lg bg-transparent-10 cursor-pointer w-full max-w-[300px] lg:max-w-[720px] hover-bg-effect overflow-hidden"
      onClick={handleClick}
    >
      <div className="flex flex-col 2xl:flex-row gap-4 2xl:gap-8 p-4 2xl:p-8">
        {/* 제목 */}
        <div className="flex w-full 2xl:w-2/5">
          <h3 className="w-full fg-principal font-bold text-md text-center md:text-start">
            {title}
          </h3>
        </div>

        {/* 내용 */}
        <div className="hidden lg:flex flex-col 2xl:w-3/5 h-full gap-3">
          <div className="fg-assistant text-sm line-clamp-3 xl:line-clamp-6">
            {content}
          </div>
          <p className="fg-principal text-sm">{name}</p>
        </div>
      </div>

      {/* 썸네일: 고정 비율로 통일 */}
      <div className="relative w-full aspect-[4/3] drop-shadow-lg">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover bg-white"
          sizes="(min-width: 1024px) 360px, 100vw"
        />
      </div>
    </div>
  );
}
