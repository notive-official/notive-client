import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  title?: string;
  className?: string;
  content?: string;
  actionNode?: ReactNode;
}

export default function Modal({
  isOpen,
  open,
  close,
  className = "max-w-md",
  title,
  content,
  actionNode,
}: ModalProps) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-[100] focus:outline-none"
        onClose={() => close()}
      >
        <div className="fixed inset-0 z-[100] w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className={`flex flex-col w-full ${className} rounded-xl bg-surface border-4 border-muted-foreground shadow-lg
               p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0`}
            >
              <div className="flex-col flex w-full justify-between px-2">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-foreground"
                >
                  {title}
                </DialogTitle>
                <p className="mt- text-sm/6 text-muted-foreground">{content}</p>
              </div>
              {actionNode}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
