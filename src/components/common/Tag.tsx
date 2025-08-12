import { XMarkIcon } from "@heroicons/react/24/solid";

interface TagProps {
  value: string;
  isRemovable?: boolean;
}

export default function Tag({ value, isRemovable = false }: TagProps) {
  return (
    <div className="bg-tertiary rounded-full w-fit h-fit">
      <div className="px-3 py-1 cursor-pointer hover-bg-effect rounded-full text-sm flex flex-row items-center gap-1">
        {value}
        {isRemovable ? <XMarkIcon className="w-4 h-4" /> : null}
      </div>
    </div>
  );
}
