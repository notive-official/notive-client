import { XMarkIcon } from "@heroicons/react/24/solid";

interface TagProps {
  value: string;
  className?: string;
  isRemovable?: boolean;
  isSelected?: boolean;
  onClick?: (v: string) => void;
}

export default function Tag({
  value,
  className = "bg-muted drop-shadow-md",
  isRemovable = false,
  isSelected = false,
  onClick,
}: TagProps) {
  return (
    <div className={`${className} rounded-full w-fit h-fit`}>
      <div
        className={`px-3 py-1 cursor-pointer hover:bg-reverse-10
          ${isSelected && "bg-reverse-10"} 
          rounded-full text-sm flex flex-row items-center gap-1`}
        onClick={() => onClick?.(value)}
      >
        {value}
        {isRemovable ? <XMarkIcon className="w-4 h-4" /> : null}
      </div>
    </div>
  );
}
