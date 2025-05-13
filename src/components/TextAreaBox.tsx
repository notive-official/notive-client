import { Description, Field, Label, Textarea } from "@headlessui/react";
import clsx from "clsx";

interface TextAreaBoxProps {
  label?: string;
  description?: string;
  rows?: number;
  value?: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputClassName?: string;
}

export default function TextAreaBox({
  label,
  description,
  rows = 2,
  value,
  placeholder,
  handleChange,
  inputClassName,
}: TextAreaBoxProps) {
  return (
    <div className="w-full my-2">
      <Field>
        <Label className="text-sm/6 font-medium fg-principal">{label}</Label>
        <Description className="text-sm/6 fg-assistant">
          {description}
        </Description>
        <Textarea
          className={clsx(
            "block w-full resize-none rounded-lg border-none bg-transparent-reverse px-3 py-1.5 text-sm/6 fg-principal",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus-outline",
            inputClassName
          )}
          rows={rows}
          onChange={(e) => handleChange(e)}
          placeholder={placeholder}
          value={value}
        />
      </Field>
    </div>
  );
}
