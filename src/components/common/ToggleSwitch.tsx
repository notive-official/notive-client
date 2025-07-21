import { Switch } from "@headlessui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}
export default function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className="group relative flex h-7 w-14 cursor-pointer rounded-full p-1 ease-in-out
        bg-dark-transparent-25 data-checked:bg-dark-transparent-75
        dark:bg-light-transparent-50 dark:data-checked:bg-light-transparent-25 inset-shadow-sm"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
      />
    </Switch>
  );
}
