import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  CloseButton,
} from "@headlessui/react";
import { ReactNode } from "react";

interface PopProps {
  node: ReactNode;
  popTopEntries: PopEntry[];
  popBottomEntries: PopEntry[];
}

export interface PopEntry {
  title: string;
  content: string;
  onClick: () => void;
}

export default function Pop({
  node,
  popTopEntries,
  popBottomEntries,
}: PopProps) {
  return (
    <div className="flex justify-center items-center">
      <Popover>
        <PopoverButton className="block cursor-pointer text-sm/6 font-semibold focus:outline-none data-focus:outline click-effect">
          {node}
        </PopoverButton>
        <PopoverBackdrop className="fixed inset-0 bg-transparent" />
        <PopoverPanel
          transition
          anchor="bottom end"
          className="divide-y divide-primary rounded-xl bg-tertiary text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
        >
          <div className="p-3">
            {popTopEntries.map((entry) => {
              return (
                <CloseButton
                  className="cursor-pointer w-full block rounded-lg px-3 py-2 transition hover-bg-effect"
                  key={entry.title}
                  onClick={entry.onClick}
                >
                  <p className="font-semibold fg-principal">{entry.title}</p>
                  <p className="fg-assistant">{entry.content}</p>
                </CloseButton>
              );
            })}
          </div>
          <div className="p-3">
            {popBottomEntries.map((entry) => {
              return (
                <CloseButton
                  onClick={entry.onClick}
                  className="cursor-pointer w-full block rounded-lg px-3 py-2 transition hover-bg-effect text-center"
                  key={entry.title}
                >
                  <p className="font-semibold fg-principal">{entry.title}</p>
                </CloseButton>
              );
            })}
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  );
}
