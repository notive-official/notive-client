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
import { ComboSelection } from "@/hooks/useCombo";

interface ComboProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  selected: ComboSelection | null;
  setSelected: Dispatch<SetStateAction<ComboSelection | null>>;
  options: ComboSelection[];
  buttons?: ReactNode[];
  maxVisible?: number;
}

export default function Combo({
  query,
  setQuery,
  selected,
  setSelected,
  options,
  buttons,
  maxVisible = 5,
}: ComboProps) {
  const height =
    Math.min(options.length + (buttons ? buttons.length : 0), maxVisible) * 40;

  return (
    <div className="w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          <ComboboxInput
            value={query}
            className={clsx(
              "w-full rounded-lg border-2 border-reverse-10 bg-surface py-1.5 pl-3 text-sm/6 text-foreground",
              "data-focus:outline-none shadow-xs"
            )}
            displayValue={(opt: { id: number; name: string }) => opt?.name}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 text-foreground hover:text-reverse-50" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          unmount={false}
          className={clsx(
            "w-(--input-width) rounded-xl bg-surface p-1 [--anchor-gap:--spacing(1)] empty:invisible",
            "transition duration-100 ease-in data-leave:data-closed:opacity-0 z-20 shadow-lg"
          )}
          style={{ height: `${height}px` }}
        >
          {buttons}
          {options.map((option) => (
            <ComboboxOption
              key={option.id}
              value={option}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none click-effect"
              onClick={() => setQuery(option.name)}
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
