import { Button, Description, Field, Input, Label } from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface InputBoxProps {
  label?: string;
  description?: string;
  placeholder?: string;
  value: string;
  handleChange: Dispatch<SetStateAction<string>>;
  buttonIcon?: ReactNode;
  onAction?: () => void;
}

export default function InputBox({
  label,
  description,
  placeholder,
  value,
  handleChange,
  buttonIcon,
  onAction,
}: InputBoxProps) {
  const [isComposing, setIsComposing] = useState(false);
  return (
    <Field className="w-full m-2">
      <div className="ml-2 flex flex-col justify-start">
        <Label className="text-sm/6 font-medium text-foreground text-left">
          {label}
        </Label>
        <Description className="text-sm/6 text-muted-foreground text-left">
          {description}
        </Description>
      </div>
      <div className="w-full flex flex-row justify-start gap-2">
        <Input
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isComposing && value !== "") {
              onAction?.();
            }
          }}
          className="block w-full rounded-xl border-none text-foreground px-4 py-2 bg-reverse-5 data-focus-outline-effect"
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          value={value}
        />
        <Button
          className="p-2 flex justify-center items-center click-effect"
          onClick={() => {
            if (!isComposing && value !== "") {
              onAction?.();
            }
          }}
        >
          {buttonIcon}
        </Button>
      </div>
    </Field>
  );
}
