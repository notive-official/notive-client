import {
  Button,
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { ReactNode } from "react";

interface PopProps {
  node: ReactNode;
  popLinkEntries: PopLinkEntry[];
  popFuncEntries: PopFuncEntry[];
}

export interface PopLinkEntry {
  title: string;
  content: string;
  link: string;
}

export interface PopFuncEntry {
  title: string;
  content: string;
  onClick: () => void;
}

export default function Pop({
  node,
  popLinkEntries,
  popFuncEntries,
}: PopProps) {
  return (
    <div className="flex justify-center items-center">
      <Popover>
        <PopoverButton className="block px-3 cursor-pointer text-sm/6 font-semibold focus:outline-none data-focus:outline click-effect">
          {node}
        </PopoverButton>
        <PopoverBackdrop className="fixed inset-0 bg-transparent" />
        <PopoverPanel
          transition
          anchor="bottom end"
          className="divide-y divide-black/5 dark:divide-white/5 rounded-xl bg-tertiary text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
        >
          <div className="p-3">
            {popLinkEntries.map((entry) => {
              return (
                <a
                  className="block rounded-lg px-3 py-2 transition hover-bg-effect"
                  href={entry.link}
                  key={entry.title}
                >
                  <p className="font-semibold text-light-fg-primary dark:text-dark-fg-primary">
                    {entry.title}
                  </p>
                  <p className="text-black/50 dark:text-white/50">
                    {entry.content}
                  </p>
                </a>
              );
            })}
          </div>
          <div className="p-3">
            {popFuncEntries.map((entry) => {
              return (
                <a
                  onClick={entry.onClick}
                  className="cursor-pointer w-full block rounded-lg px-3 py-2 transition hover-bg-effect"
                  key={entry.title}
                >
                  <p className="font-semibold text-light-fg-primary dark:text-dark-fg-primary">
                    {entry.title}
                  </p>
                  <p className="text-light-fg-assistent dark:text-dark-fg-assistent">
                    {entry.content}
                  </p>
                </a>
              );
            })}
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  );
}
