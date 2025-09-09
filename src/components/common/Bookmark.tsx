import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";

interface BookmarkProps {
  isMarked: boolean;
  className?: string;
}

export default function Bookmark({
  isMarked,
  className = "w-5 h-5",
}: BookmarkProps) {
  if (isMarked) return <BookmarkIconSolid className={className} />;
  return <BookmarkIconOutline className={className} />;
}
