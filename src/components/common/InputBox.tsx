import { Button, Description, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode, useState } from "react";

interface InputBoxProps {
  label?: string;
  description?: string;
  placeholder?: string;
  value: string;
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  handleIconClick?: () => void;
  inputClassName?: string;
}

export default function InputBox({
  label,
  description,
  placeholder,
  value,
  handleChange,
  icon,
  handleIconClick,
  inputClassName,
}: InputBoxProps) {
  const [isComposing, setIsComposing] = useState(false);
  return (
    <Field className="w-full m-2">
      <div className="ml-2 flex flex-col justify-start">
        <Label className="text-sm/6 font-medium fg-principal text-left">
          {label}
        </Label>
        <Description className="text-sm/6 fg-assistant text-left">
          {description}
        </Description>
      </div>
      <div className="w-full flex justify-start relative">
        <Input
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isComposing && value !== "") {
              handleIconClick?.();
            }
          }}
          className={clsx(
            "block w-full rounded-xl border-none fg-principal px-4 py-2 bg-transparent-reverse data-focus-outline-effect",
            inputClassName
          )}
          placeholder={placeholder}
          onChange={(e) => handleChange(e)}
          value={value}
        />
        {icon !== undefined && (
          <Button
            className="absolute right-0 top-1/2 -translate-y-1/2 click-effect mx-2"
            onClick={() => {
              if (value != "") handleIconClick?.();
            }}
          >
            {icon}
          </Button>
        )}
      </div>
    </Field>
  );
}
