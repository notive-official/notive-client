import { Tab, TabGroup, TabList } from "@headlessui/react";

interface TabsProps {
  categories: {
    index: number;
    name: string;
  }[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  className?: string;
}

export default function Tabs({
  categories,
  selectedIndex,
  setSelectedIndex,
  className = "flex w-full justify-center px-4",
}: TabsProps) {
  return (
    <div className={className}>
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabList className="flex gap-4">
          {categories.map(({ index, name }) => (
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
