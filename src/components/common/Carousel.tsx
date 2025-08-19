import { Button } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { ReactNode, useState } from "react";

interface CarouselProps {
  nodes: ReactNode[];
}

export default function Carousel({ nodes }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative overflow-hidden mb-3 w-1/3 rounded-full">
        <div className="flex items-center justify-center gap-2 my-1">
          {nodes.length > 1
            ? nodes.map((_, idx) => (
                <div
                  key={idx}
                  className={`m-0.5 rounded-full w-2 h-2 ${
                    idx === currentIndex
                      ? "bg-contrast-main"
                      : "bg-contrast-sub"
                  }`}
                />
              ))
            : null}
        </div>
      </div>
      <div className="relative w-full aspect-video overflow-hidden px-[10%] rounded-xl">
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
          <div
            onClick={() =>
              setCurrentIndex((currentIndex - 1 + nodes.length) % nodes.length)
            }
            className="absolute h-1/4 left-2 top-1/2 transform -translate-y-1/2 rounded-full cursor-pointer bg-secondary"
          >
            <Button className="w-full h-full flex items-center justify-center p-0.5 rounded-full click-effect shadow">
              <ChevronLeftIcon className="h-6 w-6" />
            </Button>
          </div>
        )}
        {currentIndex < nodes.length - 1 && (
          <div
            onClick={() => setCurrentIndex((currentIndex + 1) % nodes.length)}
            className="absolute h-1/4 right-2 top-1/2 transform -translate-y-1/2 rounded-full cursor-pointer bg-secondary"
          >
            <Button className="w-full h-full flex items-center justify-center p-0.5 rounded-full click-effect shadow">
              <ChevronRightIcon className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
