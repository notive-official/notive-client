import { Button, Description, Field, Input, Label } from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface InputBoxProps {
  label?: string; description?: string; placeholder?: string; value: string;
  handleChange: Dispatch<SetStateAction<string>>; buttonIcon?: ReactNode;
  onAction?: (v: string) => void; autoFocus?: boolean;
}

export default function InputBox({ label, description, placeholder, value, handleChange, buttonIcon, onAction, autoFocus }: InputBoxProps) {
  const [isComposing, setIsComposing] = useState(false);
  return (
    <Field className="w-full">
      {(label || description) && (
        <div className="flex flex-col gap-1 mb-2">
          {label && <Label className="text-sm font-medium text-foreground">{label}</Label>}
          {description && <Description className="text-sm text-muted-foreground">{description}</Description>}
        </div>
      )}
      <div className="flex items-center gap-2.5 bg-muted rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-ring transition-all duration-150">
        <Input
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => { if (e.key === "Enter" && !isComposing && value !== "") onAction?.(value); }}
          className="block w-full bg-transparent text-foreground text-base outline-none placeholder:text-muted-foreground/50"
          placeholder={placeholder} onChange={(e) => handleChange(e.target.value)} value={value ?? ""} autoFocus={autoFocus}
        />
        {buttonIcon && (
          <Button className="shrink-0 p-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={() => { if (!isComposing && value !== "") onAction?.(value); }}>
            {buttonIcon}
          </Button>
        )}
      </div>
    </Field>
  );
}
