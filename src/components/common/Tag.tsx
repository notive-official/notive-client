import { XMarkIcon } from "@heroicons/react/24/solid";

interface TagProps {
  value: string;
  isRemovable?: boolean;
  isSelected?: boolean;
}

export default function Tag({
  value,
  isRemovable = false,
  isSelected = false,
}: TagProps) {
  return (
    <div className="bg-secondary rounded-full w-fit h-fit">
      <div
        className={`px-3 py-1 cursor-pointer hover:bg-black/25 dark:hover:bg-white/25 
          ${isSelected && "bg-reverse-25"} 
          rounded-full text-sm flex flex-row items-center gap-1`}
      >
        {value}
        {isRemovable ? <XMarkIcon className="w-4 h-4" /> : null}
      </div>
    </div>
  );
}
