import { Switch } from "@headlessui/react";

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
}

export default function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className="group relative flex h-6 w-11 cursor-pointer rounded-full p-0.5 ease-in-out
        bg-reverse-10 data-checked:bg-foreground transition-colors duration-200"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-surface shadow ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-5"
      />
    </Switch>
  );
}
