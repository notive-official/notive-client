// useIntersectionObserver.ts
import { useCallback, useEffect, useMemo, useState, RefObject } from "react";

type RootLike = Element | null | RefObject<Element | null>;

interface UseIntersectionObserverProps {
  root?: RootLike;
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver({
  root = null,
  threshold = 0,
  rootMargin = "0px",
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  // 센티널을 콜백 ref로 관리 → 붙는 순간 re-render 유도
  const [target, setTarget] = useState<Element | null>(null);
  const targetRef = useCallback((node: Element | null) => {
    setTarget(node);
  }, []);

  // RefObject도 지원: 현재 DOM 엘리먼트로 해석
  const resolvedRoot = useMemo<Element | null>(() => {
    if (root && typeof root === "object" && "current" in root) {
      return (root as RefObject<Element | null>).current ?? null;
    }
    return (root as Element | null) ?? null;
  }, [root]);

  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { root: resolvedRoot, threshold, rootMargin }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [target, resolvedRoot, threshold, rootMargin]);

  return { targetRef, isIntersecting };
}
