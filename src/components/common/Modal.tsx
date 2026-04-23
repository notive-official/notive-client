import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";

interface ModalProps { isOpen: boolean; open: () => void; close: () => void; title?: string; className?: string; content?: string; actionNode?: ReactNode }

export default function Modal({ isOpen, close, className = "max-w-sm", title, content, actionNode }: ModalProps) {
  return (
    <Dialog open={isOpen} as="div" className="relative z-[100] focus:outline-none" onClose={() => close()}>
      <div className="fixed inset-0 z-[100] bg-black/25" />
      <div className="fixed inset-0 z-[100] w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel transition className={`flex flex-col w-full ${className} rounded-lg bg-surface border border-border shadow-lg p-4 duration-150 ease-out data-closed:scale-95 data-closed:opacity-0`}>
            {title && <DialogTitle as="h3" className="text-sm font-semibold text-foreground">{title}</DialogTitle>}
            {content && <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{content}</p>}
            {actionNode}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
