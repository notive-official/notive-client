"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  XMarkIcon,
  XCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  BellAlertIcon,
} from "@heroicons/react/24/solid";
// import { X, XCircle, AlertTriangle, Info, CheckCircle } from

export type BarVariant = "error" | "warning" | "info" | "success";

export type BarItem = {
  id: string;
  title?: string;
  message: string;
  variant?: BarVariant;
  timeoutMs?: number; // auto-dismiss
};

interface ErrorBarContextValue {
  push: (payload: Omit<BarItem, "id">) => string;
  pushError: (message: string, opts?: Partial<BarItem>) => string;
  pushWarning: (message: string, opts?: Partial<BarItem>) => string;
  pushInfo: (message: string, opts?: Partial<BarItem>) => string;
  pushSuccess: (message: string, opts?: Partial<BarItem>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ErrorBarContext = createContext<ErrorBarContextValue | null>(null);

export function useErrorBar() {
  const ctx = useContext(ErrorBarContext);
  if (!ctx)
    throw new Error("useErrorBar must be used within <ErrorBarProvider>");
  return ctx;
}

function uid() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

const variantIcon: Record<BarVariant, React.ReactNode> = {
  error: <XCircleIcon className="size-5" aria-hidden />,
  warning: <BellAlertIcon className="size-5" aria-hidden />,
  info: <InformationCircleIcon className="size-5" aria-hidden />,
  success: <CheckCircleIcon className="size-5" aria-hidden />,
};

const variantClasses: Record<BarVariant, string> = {
  error: "bg-red-600 text-white",
  warning: "bg-amber-500 text-black",
  info: "bg-blue-600 text-white",
  success: "bg-emerald-600 text-white",
};

export function ErrorBarProvider({
  children,
  position = "bottom", // "top" | "bottom"
  align = "center", // "left" | "center" | "right"
  listenGlobal = true, // capture window error/unhandledrejection
  maxStack = 3,
}: {
  children: React.ReactNode;
  position?: "top" | "bottom";
  align?: "left" | "center" | "right";
  listenGlobal?: boolean;
  maxStack?: number;
}) {
  const [items, setItems] = useState<BarItem[]>([]);
  const timers = useRef(new Map<string, number>());

  const containerPosition = useMemo(() => {
    const pos = position === "top" ? "top-10" : "bottom-10";
    const al =
      align === "left"
        ? "left-4"
        : align === "right"
        ? "right-4"
        : "left-1/2 -translate-x-1/2";
    return `${pos} ${al}`;
  }, [position, align]);

  const scheduleDismiss = useCallback((id: string, timeoutMs?: number) => {
    if (!timeoutMs) return;
    const handle = window.setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== id));
      timers.current.delete(id);
    }, timeoutMs);
    timers.current.set(id, handle);
  }, []);

  const push = useCallback<ErrorBarContextValue["push"]>(
    (payload) => {
      const id = uid();
      setItems((prev) => {
        const next: BarItem[] = [
          { id, variant: "error", timeoutMs: 3000, ...payload },
          ...prev,
        ];
        return next.slice(0, maxStack);
      });
      scheduleDismiss(id, payload.timeoutMs ?? 3000);
      return id;
    },
    [maxStack, scheduleDismiss]
  );

  const dismiss = useCallback<ErrorBarContextValue["dismiss"]>((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    const t = timers.current.get(id);
    if (t) {
      window.clearTimeout(t);
      timers.current.delete(id);
    }
  }, []);

  const dismissAll = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current.clear();
    setItems([]);
  }, []);

  useEffect(() => () => dismissAll(), [dismissAll]);

  useEffect(() => {
    if (!listenGlobal) return;
    const onError = (ev: ErrorEvent) => {
      push({ message: ev.message, variant: "error" });
    };
    const onRejection = (ev: PromiseRejectionEvent) => {
      const msg =
        (ev.reason && (ev.reason.message || String(ev.reason))) ||
        "Unhandled promise rejection";
      push({ message: String(msg), variant: "error" });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, [listenGlobal, push]);

  const value = useMemo<ErrorBarContextValue>(
    () => ({
      push,
      pushError: (message, opts) =>
        push({ message, variant: "error", ...(opts || {}) }),
      pushWarning: (message, opts) =>
        push({ message, variant: "warning", ...(opts || {}) }),
      pushInfo: (message, opts) =>
        push({ message, variant: "info", ...(opts || {}) }),
      pushSuccess: (message, opts) =>
        push({ message, variant: "success", ...(opts || {}) }),
      dismiss,
      dismissAll,
    }),
    [push, dismiss, dismissAll]
  );

  return (
    <ErrorBarContext.Provider value={value}>
      {children}
      {/* Portal-like fixed container */}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed z-[100] ${containerPosition} w-full max-w-md`}
      >
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: position === "top" ? -20 : 20,
                scale: 0.98,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: position === "top" ? -20 : 20,
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35,
                mass: 0.7,
              }}
              className="pointer-events-auto mb-2"
            >
              <BarCard item={item} onClose={() => dismiss(item.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ErrorBarContext.Provider>
  );
}

function BarCard({ item, onClose }: { item: BarItem; onClose: () => void }) {
  const variant = item.variant ?? "error";
  const palette = variantClasses[variant];
  return (
    <div
      role="status"
      className={`shadow-xl rounded-2xl px-4 py-3 ${palette} backdrop-blur supports-[backdrop-filter]:bg-opacity-90`}
    >
      <div className="flex items-center gap-3">
        <div className="mt-0.5">{variantIcon[variant]}</div>
        <div className="flex-1 min-w-0">
          {item.title && (
            <div className="font-semibold leading-tight">{item.title}</div>
          )}
          <div className="text-sm leading-snug break-words">{item.message}</div>
        </div>
        <button
          aria-label="닫기"
          className="shrink-0 rounded-xl p-1 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
          onClick={onClose}
        >
          <XMarkIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}

export default ErrorBarProvider;
