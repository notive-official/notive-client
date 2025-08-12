"use client";
import { Link, usePathname } from "@/i18n/routing";
import { MinusIcon } from "@heroicons/react/16/solid";

interface ArchiveMenuProps {
  menu?: string;
}

const NOTE = "/archive/note";
const GROUP = "/archive/group";
const LINK = "/archive/link";
const LIKE = "/archive/like";

export default function ArchiveMenu({}: ArchiveMenuProps) {
  const pathname = usePathname();
  const isNoteActive = pathname.startsWith(NOTE);
  const isLinkActive = pathname.startsWith(LINK);
  const isLikeActive = pathname.startsWith(LIKE);
  const isGroupActive = pathname.startsWith(GROUP);
  return (
    <div className="flex flex-row md:flex-col w-full h-full gap-4 py-4 drop-shadow-lg md:shadow-none justify-center items-center">
      <Link
        href={NOTE}
        className="flex flex-row justify-center md:justify-start cursor-pointer hover-text-effect w-full"
      >
        {isNoteActive && <MinusIcon className="w-6 h-6" />}
        {<div className={`${isNoteActive && "font-bold"}`}>NOTE</div>}
      </Link>
      <Link
        href={LINK}
        className="flex flex-row justify-center md:justify-start cursor-pointer hover-text-effect w-full"
      >
        {isLinkActive && <MinusIcon className="w-6 h-6" />}
        {<div className={`${isLinkActive && "font-bold"}`}>LINK</div>}
      </Link>
      <Link
        href={LIKE}
        className="flex flex-row justify-center md:justify-start cursor-pointer hover-text-effect w-full"
      >
        {isLikeActive && <MinusIcon className="w-6 h-6" />}
        {<div className={`${isLikeActive && "font-bold"}`}>LIKE</div>}
      </Link>
      <Link
        href={GROUP}
        className="flex flex-row justify-center md:justify-start cursor-pointer hover-text-effect w-full"
      >
        {isGroupActive && <MinusIcon className="w-6 h-6" />}
        {<div className={`${isGroupActive && "font-bold"}`}>GROUP</div>}
      </Link>
    </div>
  );
}
