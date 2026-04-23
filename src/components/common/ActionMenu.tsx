import { Button } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { ReactNode, useEffect, useRef, useState } from "react";

interface ActionMenuProps {
  menuItems: { node: ReactNode; onClick: () => void }[];
  className?: string;
  icon?: ReactNode;
}

export default function ActionMenu({
  menuItems,
  className = "absolute top-2 right-2 p-1 z-10 text-muted-foreground hover:text-foreground cursor-pointer transition-colors",
  icon = <EllipsisVerticalIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />,
}: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div>
      <Button className={className} onClick={(e) => { e.stopPropagation(); setOpen(true); }}>{icon}</Button>
      {open && (
        <div ref={ref} className="absolute right-2 top-10 w-28 rounded-lg border border-border bg-surface p-1 text-xs shadow-lg z-10">
          {menuItems.map(({ node, onClick }, i) => (
            <Button key={i} onClick={(e) => { e.stopPropagation(); onClick(); setOpen(false); }}
              className="flex w-full items-center gap-1.5 rounded-md px-2.5 py-1.5 text-left text-foreground hover:bg-reverse-5 transition-colors cursor-pointer">
              {node}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
