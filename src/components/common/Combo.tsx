import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import Hangul from "hangul-js";

export interface ComboSelection {
  id: string;
  name: string;
}

interface ComboProps {
  selected: ComboSelection | null;
  setSelected: Dispatch<SetStateAction<ComboSelection | null>>;
  options: ComboSelection[];
  button?: ReactNode;
  maxVisible?: number;
}

export default function Combo({
  selected,
  setSelected,
  options,
  button,
  maxVisible = 5,
}: ComboProps) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((o) => Hangul.search(o.name, query) > -1);

  const height = Math.min(filteredOptions.length, maxVisible) * 40;

  return (
    <div className="w-full">
      <Combobox
        value={selected}
        onChange={setSelected}
        onClose={() => setQuery("")}
        __demoMode
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border-none bg-secondary py-1.5 pl-3 text-sm/6 text-foreground",
              "data-focus:outline-none shadow-sm"
            )}
            displayValue={(opt: { id: number; name: string }) => opt?.name}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 text-foreground hover-text-effect" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-(--input-width) rounded-xl bg-secondary p-1 [--anchor-gap:--spacing(1)] empty:invisible",
            "transition duration-100 ease-in data-leave:data-closed:opacity-0 z-20"
          )}
          style={{ height: `${height}px` }}
        >
          {button}
          {filteredOptions.map((option) => (
            <ComboboxOption
              key={option.id}
              value={option}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none click-effect"
            >
              <CheckIcon className="invisible size-4 text-foreground group-data-selected:visible" />
              <div className="text-sm/6 text-foreground">{option.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
