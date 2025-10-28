import { Button } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { ReactNode, useEffect, useRef, useState } from "react";

interface ActionMenuProps {
  menuItems: {
    node: ReactNode;
    onClick: () => void;
  }[];
  className?: string;
  icon?: ReactNode;
}

export default function ActionMenu({
  menuItems,
  className = "absolute top-4 right-2 p-1 z-10 hover:text-muted-foreground text-foreground cursor-pointer",
  icon = (
    <EllipsisVerticalIcon className="w-6 h-6 opacity-0 transition group-hover:opacity-100" />
  ),
}: ActionMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <div>
      <Button
        className={className}
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(true);
        }}
      >
        {icon}
      </Button>
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-32 origin-top-left rounded-lg border border-gray-200 bg-white p-1 text-sm shadow-lg z-10"
        >
          {menuItems.map(({ node, onClick }, index) => (
            <Button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
                setMenuOpen(false);
              }}
              className="group flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-primay \
                hover:bg-black/5 transition-colors click-effect"
            >
              {node}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
