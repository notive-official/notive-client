import { Button } from "@headlessui/react";
import Tag from "../common/Tag";

interface TagSelectBarProps { onClick: (value: string | null) => void; selectedTag: string | null; tags: string[]; }

export default function TagSelectBar({ onClick, selectedTag, tags }: TagSelectBarProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none" onMouseDown={(e) => e.preventDefault()}>
      <Button className="w-fit" onClick={() => onClick(null)}>
        <Tag value="All" isSelected={selectedTag === null} />
      </Button>
      {tags.map((v) => (
        <Button key={v} className="w-fit" onClick={() => onClick(selectedTag === v ? null : v)}>
          <Tag value={v} isSelected={v === selectedTag} />
        </Button>
      ))}
    </div>
  );
}
