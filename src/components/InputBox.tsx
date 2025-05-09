import { Button, Description, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface InputBoxProps {
  label: string;
  description: string;
  placeholder: string;
}

export default function InputBox({
  placeholder,
  label,
  description,
}: InputBoxProps) {
  return (
    <div className="w-full max-w-md px-4">
      <Field>
        <div className="ml-2 flex flex-col justify-start">
          <Label className="text-sm/6 font-medium text-white text-left">
            {label}
          </Label>
          <Description className="text-sm/6 text-white/50 text-left">
            {description}
          </Description>
        </div>
        <div className="mt-3 flex justify-center">
          <Input
            className={clsx(
              "block w-full rounded-lg border-none text-black/75 px-3 py-1.5 text-sm/6 bg-white",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
            )}
            placeholder={placeholder}
          />
          <Button className="block px-3 ml-2 cursor-pointer text-sm/6 font-semibold border rounded-lg click-effect">
            <MagnifyingGlassIcon className="w-6 h-6" />
          </Button>
        </div>
      </Field>
    </div>
  );
}
