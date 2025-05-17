import type { ImageLoaderProps } from "next/image";

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const cfHost = process.env.NEXT_PUBLIC_CLOUD_FRONT_BASE;
  const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "";

  // 1) CloudFront 도메인이면 직접 URL 반환
  if (src.includes(cfHost)) {
    return src;
  }

  // 2) 그 외는 프록시
  const params = new URLSearchParams({
    url: src,
    ...(width ? { w: width.toString() } : {}),
    ...(quality ? { q: quality.toString() } : {}),
  });
  return `${apiBase}/api/archive/image-proxy?${params}`;
}
