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
  // 클라이언트에서만 로그를 남기고 싶다면
  useEffect(() => {
    console.error("[GlobalError]", error);
    // Sentry.captureException(error) 등 외부 로깅 가능
  }, [error]);

  return (
    <html>
      <body style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>앗, 문제가 발생했어요.</h1>
        <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
        <Button onClick={() => reset()} style={{ marginTop: "1rem" }}>
          다시 시도
        </Button>
      </body>
    </html>
  );
}
