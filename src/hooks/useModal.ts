import { useCallback, useMemo, useState } from "react";

type UseModalInit = {
  isOpened?: boolean;
  onChange?: (v: boolean) => void;
};

export function useModal(init?: UseModalInit) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  const modalBind = useMemo(
    () => ({ isOpen, open, close }),
    [isOpen, open, close]
  );

  return { isOpen, open, close, setIsOpen, modalBind };
}
