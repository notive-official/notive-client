import { useAuth } from "@/contexts/AuthContext";
import { ListTag, useListTagsQuery } from "@/hooks/api/archive/tag";
import { Button } from "@headlessui/react";
import Tag from "../common/Tag";

interface TagSelectBarProps {
  onClick: (value: string) => void;
  selectedTag?: string;
}

export default function TagSelectBar({
  onClick,
  selectedTag,
}: TagSelectBarProps) {
  const { isAuthenticated } = useAuth();
  const { data } = useListTagsQuery({
    url: ListTag.url(),
    key: ListTag.key(),
    options: { enabled: isAuthenticated },
  });
  const handleClick = (value: string) => {
    onClick(value);
  };

  return (
    <div className="h-full w-full flex flex-col md:flex-row items-center mx-auto">
      <div className="w-full">
        <div
          className="mt-1 z-20 rounded-xl p-2 min-h-10 max-h-40 overflow-y-auto"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="flex flex-wrap items-center gap-2">
            {data?.content.map((v) => (
              <Button key={v} className="w-fit" onClick={() => handleClick(v)}>
                <Tag value={v} isSelected={v === selectedTag} />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
