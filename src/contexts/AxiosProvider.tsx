"use client";

import { ReactNode } from "react";
import { QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/api";

interface ProvidersProps {
  children: ReactNode;
  dehydratedState?: unknown;
}

export default function AxiosProvider({
  children,
  dehydratedState,
}: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
