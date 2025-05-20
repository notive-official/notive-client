import type { ImageLoaderProps } from "next/image";

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const cfHost = process.env.NEXT_PUBLIC_CLOUD_FRONT_BASE;
  const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "";

  if (/^\/(?!\/)(?!.*\.\.)/.test(src)) {
    return src;
  }

  if (src.includes(cfHost)) {
    return src;
  }

  const params = new URLSearchParams({
    url: src,
    ...(width ? { w: width.toString() } : {}),
    ...(quality ? { q: quality.toString() } : {}),
  });
  return `${apiBase}/api/archive/image-proxy?${params}`;
}
