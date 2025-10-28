import { Tab, TabGroup, TabList } from "@headlessui/react";
import { useState } from "react";

interface TabsProps<T> {
  categories: {
    name: string;
    value: T;
  }[];
  initialValue: string;
  setSelectedValue: (value: T) => void;
  className?: string;
}

export default function Tabs<T>({
  categories,
  initialValue,
  setSelectedValue,
  className = "flex w-full justify-center px-4",
}: TabsProps<T>) {
  const defaultIndex =
    categories.findIndex((category) => category.value === initialValue) ?? 0;
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const setSelected = (targetIndex: number) => {
    setSelectedIndex(targetIndex);
    setSelectedValue(categories[targetIndex].value);
  };

  return (
    <div className={className}>
      <TabGroup selectedIndex={selectedIndex} onChange={setSelected}>
        <TabList className="flex gap-4">
          {categories.map(({ name, value }, index) => (
            <Tab
              key={name}
              className={`rounded-full px-3 py-1 text-sm/6 font-semibold text-foreground ${
                selectedIndex === index ? "bg-reverse-10" : "bg-transparent"
              } cursor-pointer 
              focus:not-data-focus:outline-none hover:bg-reverse-10`}
            >
              {name}
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </div>
  );
}
