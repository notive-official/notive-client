"use client";

import { ReactNode } from "react";
import {
  QueryClientProvider,
  HydrationBoundary,
  QueryClient,
  dehydrate,
  DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ProvidersProps {
  children: ReactNode;
  dehydratedState?: unknown;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5분
    },
  },
});

const dehydratedState: DehydratedState = dehydrate(queryClient);

export default function AxiosProvider({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
