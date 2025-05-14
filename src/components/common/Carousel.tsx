import { Button } from "@headlessui/react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/16/solid";
import { ReactNode, useState } from "react";

interface CarouselProps {
  nodes: ReactNode[];
}

export default function Carousel({ nodes }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="relative w-full aspect-video overflow-hidden px-[10%] bg-transparent-reverse rounded-xl">
      <div
        className="flex h-full transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {nodes.map((node, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full px-2">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              {node}
            </div>
          </div>
        ))}
      </div>
      {currentIndex > 0 && (
        <Button
          onClick={() =>
            setCurrentIndex((currentIndex - 1 + nodes.length) % nodes.length)
          }
          className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full p-1 cursor-pointer click-effect"
        >
          <ArrowLeftCircleIcon className="h-6 w-6" />
        </Button>
      )}
      {currentIndex < nodes.length - 1 && (
        <Button
          onClick={() => setCurrentIndex((currentIndex + 1) % nodes.length)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full p-1 cursor-pointer click-effect"
        >
          <div className="w-full h-full px-0.2 py-0.2 bg-primary rounded-full">
            <ArrowRightCircleIcon className="h-6 w-6" />
          </div>
        </Button>
      )}
    </div>
  );
}
