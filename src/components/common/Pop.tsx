import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { ReactNode } from "react";

interface PopProps {
  node: ReactNode;
  popTopNode: ReactNode[];
  popBottomNode: ReactNode[];
}

export default function Pop({ node, popTopNode, popBottomNode }: PopProps) {
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
          className="divide-y divide-primary rounded-xl bg-tertiary z-50 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
        >
          <div className="p-3">{popTopNode}</div>
          <div className="p-3">{popBottomNode}</div>
        </PopoverPanel>
      </Popover>
    </div>
  );
}
