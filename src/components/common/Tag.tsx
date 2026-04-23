import { XMarkIcon } from "@heroicons/react/24/solid";

interface TagProps { value: string; className?: string; isRemovable?: boolean; isSelected?: boolean; onClick?: (v: string) => void }

export default function Tag({ value, className, isRemovable = false, isSelected = false, onClick }: TagProps) {
  return (
    <div
      className={`${className ?? ""} inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer select-none transition-all duration-150 whitespace-nowrap
        ${isSelected ? "bg-foreground text-surface" : "bg-muted text-muted-foreground hover:text-foreground"}`}
      onClick={() => onClick?.(value)}
    >
      {value}
      {isRemovable && <XMarkIcon className="w-3.5 h-3.5" />}
    </div>
  );
}
