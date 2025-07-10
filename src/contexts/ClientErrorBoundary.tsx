"use client";

import { Button } from "@headlessui/react";
import { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function ClientErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>앗, 클라이언트 에러 발생!</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
      <Button onClick={resetErrorBoundary} style={{ marginTop: 16 }}>
        다시 시도
      </Button>
    </div>
  );
}

export default function ClientErrorBoundary({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={ClientErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
