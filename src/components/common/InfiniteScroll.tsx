"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect, ReactNode, RefObject } from "react";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { SliceRes } from "@/lib/type";

interface InfiniteScrollProps<T> {
  result: UseInfiniteQueryResult<InfiniteData<SliceRes<T>, unknown>, Error>;
  root: Element | null | RefObject<Element | null>;
  children: (item: T, index: number) => ReactNode;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  className?: string;
}

export default function InfiniteScroll<T>({
  result,
  root,
  children,
  loadingComponent = <div className="text-lg">로딩 중...</div>,
  errorComponent = (
    <div className="text-lg text-red-500">
      데이터를 불러오는 중 오류가 발생했습니다.
    </div>
  ),
  className = "grid grid-cols-1 sm:grid-cols-2 gap-8",
}: InfiniteScrollProps<T>) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = result;

  const { targetRef, isIntersecting } = useIntersectionObserver({
    root,
    threshold: 0,
    rootMargin: "0px 0px 100px 0px",
  });

  // 스크롤이 하단에 도달했을 때 다음 페이지 로드
  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const payloads = data?.pages.flatMap((page) => page.content) ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        {loadingComponent}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        {errorComponent}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-20 w-full pb-32">
      <div className={className}>
        {payloads.map((item, index) => children(item, index))}
      </div>

      {/* 무한 스크롤 트리거 요소 */}
      <div ref={targetRef} className="flex justify-center items-center h-20">
        {isFetchingNextPage && (
          <div className="text-lg">다음 페이지 로딩 중...</div>
        )}
        {!hasNextPage && payloads.length > 0 && (
          <div className="text-lg text-gray-500">
            모든 데이터를 불러왔습니다.
          </div>
        )}
      </div>
    </div>
  );
}
