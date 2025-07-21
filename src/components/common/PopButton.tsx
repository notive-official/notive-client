import { CloseButton } from "@headlessui/react";
import { ReactNode } from "react";

interface PopButtonProps {
  title: string;
  onClick: () => void;
  description?: string;
  icon?: ReactNode;
  textCenter?: boolean;
}

export default function PopButton({
  title,
  onClick,
  description,
  icon,
  textCenter = false,
}: PopButtonProps) {
  const text = textCenter ? "text-center" : "text-start";
  return (
    <CloseButton
      className="flex flex-row cursor-pointer w-full rounded-lg px-3 py-2 transition hover-bg-effect gap-2"
      onClick={onClick}
    >
      {icon}
      <div className="flex flex-col w-full">
        <p className={`font-semibold fg-principal ${text}`}>{title}</p>
        <p className={`fg-assistant text-start ${text}`}>{description}</p>
      </div>
    </CloseButton>
  );
}
