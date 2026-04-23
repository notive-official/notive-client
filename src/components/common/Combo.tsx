import {
  Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Dispatch, ReactNode, SetStateAction } from "react";
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

export default function Combo({ query, setQuery, selected, setSelected, options, buttons, maxVisible = 5 }: ComboProps) {
  const height = Math.min(options.length + (buttons ? buttons.length : 0), maxVisible) * 44;

  return (
    <div className="w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          <ComboboxInput
            value={query}
            className="w-full rounded-lg border border-border bg-surface py-2.5 pl-3 pr-9 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
            displayValue={(opt: { id: number; name: string }) => opt?.name}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 px-3">
            <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
          </ComboboxButton>
        </div>
        <ComboboxOptions
          anchor="bottom"
          transition
          unmount={false}
          className="w-(--input-width) rounded-xl bg-surface border border-border p-1.5 [--anchor-gap:--spacing(1)] empty:invisible transition duration-100 ease-in data-leave:data-closed:opacity-0 z-20 shadow-lg"
          style={{ height: `${height}px` }}
        >
          {buttons}
          {options.map((option) => (
            <ComboboxOption
              key={option.id} value={option}
              className="group flex items-center gap-2 rounded-lg px-3 py-2 select-none cursor-pointer hover:bg-reverse-5 transition-colors"
              onClick={() => setQuery(option.name)}
            >
              <CheckIcon className="invisible w-4 h-4 text-foreground group-data-selected:visible" />
              <span className="text-sm text-foreground">{option.name}</span>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
