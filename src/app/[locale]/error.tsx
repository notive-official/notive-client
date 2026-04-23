// app/error.tsx
"use client";

import { Button } from "@headlessui/react";
import { useEffect } from "react";

export default function RootError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html>
      <body className="h-screen flex items-center justify-center bg-surface font-[Inter,sans-serif]">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <h1 className="text-xl font-semibold text-foreground">
            문제가 발생했어요
          </h1>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            {error.message}
          </p>
          <Button
            onClick={() => reset()}
            className="mt-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-on-primary hover:opacity-90 transition-opacity cursor-pointer"
          >
            다시 시도
          </Button>
        </div>
      </body>
    </html>
  );
}
