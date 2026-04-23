import { CloseButton } from "@headlessui/react";
import { ReactNode } from "react";

interface PopButtonProps { title: string; onClick: () => void; icon?: ReactNode; textCenter?: boolean }

export default function PopButton({ title, onClick, icon, textCenter = false }: PopButtonProps) {
  return (
    <CloseButton className="flex items-center w-full gap-2 px-2.5 py-1.5 rounded-md hover:bg-reverse-5 cursor-pointer transition-colors" onClick={onClick}>
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <span className={`w-full text-xs font-medium text-foreground ${textCenter ? "text-center" : "text-start"}`}>{title}</span>
    </CloseButton>
  );
}
