import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

export interface Item {
  name: string;
  handleClick: () => void;
}

interface DropdowndProps {
  node: ReactNode;
  items: Item[];
}

export default function Dropdown({ node, items }: DropdowndProps) {
  return (
    <div className="text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm/6 font-semibold text-foreground shadow-inner data-focus:outline click-effect">
          {node}
          <ChevronDownIcon className="size-2.5" />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border  p-1 text-sm/6 text-foreground transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          {items.map((item) => {
            return (
              <MenuItem key={item.name}>
                <Button
                  onClick={item.handleClick}
                  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover-bg-effect"
                >
                  {item.name}
                </Button>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
    </div>
  );
}
