import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel, Portal } from "@headlessui/react";
import { ReactNode } from "react";

interface PopProps { node: ReactNode; popTopNode: ReactNode[]; popBottomNode: ReactNode[] }

export default function Pop({ node, popTopNode, popBottomNode }: PopProps) {
  return (
    <Popover className="flex items-center">
      {({ close }) => (
        <>
          <PopoverButton className="block cursor-pointer text-sm font-medium focus:outline-none rounded-md hover:bg-reverse-5 transition-colors">{node}</PopoverButton>
          <Portal><PopoverBackdrop className="fixed inset-0 bg-transparent z-40" onClick={() => close()} /></Portal>
          <Portal>
            <PopoverPanel transition anchor="bottom end"
              className="divide-y divide-border rounded-lg bg-surface border border-border z-50 text-xs transition duration-150 ease-out [--anchor-gap:--spacing(1)] data-closed:-translate-y-1 data-closed:opacity-0 shadow-lg min-w-[160px]">
              <div className="p-1">{popTopNode}</div>
              <div className="p-1">{popBottomNode}</div>
            </PopoverPanel>
          </Portal>
        </>
      )}
    </Popover>
  );
}
