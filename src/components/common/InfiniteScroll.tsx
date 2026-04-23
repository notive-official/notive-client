"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect, ReactNode, RefObject } from "react";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { SliceRes } from "@/lib/type";

interface InfiniteScrollProps<T> {
  result: UseInfiniteQueryResult<InfiniteData<SliceRes<T>, unknown>, Error>;
  root: Element | null | RefObject<Element | null>;
  children: (item: T, index: number) => ReactNode;
  payloads?: T[];
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  className?: string;
}

export default function InfiniteScroll<T>({
  result, root, children, payloads,
  loadingComponent = <div className="w-5 h-5 border-2 border-border border-t-secondary rounded-full animate-spin" />,
  errorComponent = <span className="text-sm text-muted-foreground">Something went wrong</span>,
  className = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5",
}: InfiniteScrollProps<T>) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = result;
  const { targetRef, isIntersecting } = useIntersectionObserver({ root, threshold: 0, rootMargin: "0px 0px 100px 0px" });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const items = payloads ?? data?.pages.flatMap((p) => p.content) ?? [];

  if (isLoading) return <div className="flex justify-center py-24">{loadingComponent}</div>;
  if (isError) return <div className="flex justify-center py-24">{errorComponent}</div>;
  if (payloads?.length === 0) return <div className="flex justify-center py-16"><span className="text-sm text-muted-foreground">No results</span></div>;

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className={className}>{items.map((item, i) => children(item, i))}</div>
      <div ref={targetRef} className="flex justify-center h-12">
        {isFetchingNextPage && <div className="w-5 h-5 border-2 border-border border-t-secondary rounded-full animate-spin" />}
      </div>
    </div>
  );
}
