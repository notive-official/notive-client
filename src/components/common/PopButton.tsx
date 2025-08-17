import { CloseButton } from "@headlessui/react";
import { ReactNode } from "react";

interface PopButtonProps {
  title: string;
  onClick: () => void;
  icon?: ReactNode;
  textCenter?: boolean;
}

export default function PopButton({
  title,
  onClick,
  icon,
  textCenter = false,
}: PopButtonProps) {
  const text = textCenter ? "text-center" : "text-start";
  return (
    <CloseButton
      className="flex items-center w-full gap-2 px-3 py-2 rounded-lg hover-bg-effect cursor-pointer transition"
      onClick={onClick}
    >
      {icon}
      <span className={`w-full font-medium text-foreground ${text}`}>
        {title}
      </span>
    </CloseButton>
  );
}
