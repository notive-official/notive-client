import { Switch } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
}
export default function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className="group relative flex h-7 w-14 cursor-pointer rounded-full p-1 ease-in-out
        bg-reverse-25 data-checked:bg-reverse-75 inset-shadow-sm"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
      />
    </Switch>
  );
}
