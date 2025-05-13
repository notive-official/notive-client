import { Description, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";

interface InputBoxProps {
  label?: string;
  description?: string;
  placeholder?: string;
  button?: ReactNode;
  inputClassName?: string;
  value?: string;
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBox({
  placeholder,
  label,
  description,
  button,
  inputClassName,
  value,
  handleChange,
}: InputBoxProps) {
  return (
    <Field>
      <div className="w-full ml-2 flex flex-col justify-start">
        <Label className="text-sm/6 font-medium fg-principal text-left">
          {label}
        </Label>
        <Description className="text-sm/6 fg-assistant text-left">
          {description}
        </Description>
      </div>
      <div className="w-full flex justify-center">
        <Input
          className={clsx(
            inputClassName,
            "block w-full rounded-xl border-none fg-principal px-4 py-2 bg-transparent-reverse",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus-outline"
          )}
          placeholder={placeholder}
          onChange={(e) => handleChange(e)}
          value={value}
        />
        {button}
      </div>
    </Field>
  );
}
