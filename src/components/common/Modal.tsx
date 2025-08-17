import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode, useCallback, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ModalProps {
  openNode: ReactNode;
  title: string;
  content?: string;
  actionNode?: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function Modal({
  openNode,
  title,
  content,
  actionNode,
  isOpen: controlled,
  onOpenChange,
}: ModalProps) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const isControlled = controlled !== undefined;
  const openState = isControlled ? controlled : uncontrolled;

  const setOpen = useCallback(
    (next: boolean) => {
      if (isControlled) {
        onOpenChange?.(next);
      } else {
        setUncontrolled(next);
      }
    },
    [isControlled, onOpenChange]
  );

  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);

  return (
    <>
      <Button onClick={open}>{openNode}</Button>

      <Dialog
        open={openState}
        as="div"
        className="relative z-30 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-auto w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-secondary shadow-lg
               p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <div className="flex-row flex w-full justify-between px-2">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-foreground"
                >
                  {title}
                </DialogTitle>
                <Button className="w-7 h-7 cursor-pointer" onClick={close}>
                  <XMarkIcon />
                </Button>
              </div>
              <p className="mt-2 text-sm/6 text-white/50">{content}</p>
              {actionNode}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
