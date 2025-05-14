import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ModalProps {
  buttonName: string;
  title: string;
  content?: string;
}

export default function Modal({ buttonName, title, content }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Button
        onClick={open}
        className="cursor-pointer rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
      >
        {buttonName}
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <div className="flex-row flex w-full justify-between">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-white"
                >
                  {title}
                </DialogTitle>
                <Button className="w-7 h-7 cursor-pointer" onClick={close}>
                  <XMarkIcon />
                </Button>
              </div>
              <p className="mt-2 text-sm/6 text-white/50">{content}</p>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
