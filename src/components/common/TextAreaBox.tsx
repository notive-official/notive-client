import { Description, Field, Label, Textarea } from "@headlessui/react";
import clsx from "clsx";
import { useRef } from "react";

interface TextAreaBoxProps {
  label?: string;
  description?: string;
  rows?: number;
  value?: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputClassName?: string;
  scrollable?: boolean;
}

export default function TextAreaBox({
  label,
  description,
  rows = 2,
  value,
  placeholder,
  handleChange,
  inputClassName,
  scrollable = true,
}: TextAreaBoxProps) {
  const taRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  return (
    <div className="w-full my-2">
      <Field>
        <Label className="text-sm/6 font-medium fg-principal">{label}</Label>
        <Description className="text-sm/6 fg-assistant">
          {description}
        </Description>
        <Textarea
          ref={!scrollable ? taRef : undefined}
          className={clsx(
            "block w-full resize-none rounded-lg border-none bg-transparent-reverse-5 px-3 py-1.5 text-sm/6 fg-principal",
            "data-focus-outline-effect",
            inputClassName
          )}
          rows={rows}
          onInput={!scrollable ? handleInput : undefined}
          onChange={(e) => handleChange(e)}
          placeholder={placeholder}
          value={value}
        />
      </Field>
    </div>
  );
}
