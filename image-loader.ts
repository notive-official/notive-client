import type { ImageLoaderProps } from "next/image";

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const cfHost = process.env.NEXT_PUBLIC_CLOUD_FRONT_BASE;
  const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "";

  if (src.startsWith("/icons")) return src;

  if (!isAbsoluteUrl(src)) {
    const normalized = src.startsWith("/") ? src : `/${src}`;
    return `${cfHost}${normalized}`;
  }

  const params = new URLSearchParams({
    url: src,
    ...(width ? { w: width.toString() } : {}),
    ...(quality ? { q: quality.toString() } : {}),
  });
  return `${apiBase}/api/proxy/image?${params}`;
}

function isAbsoluteUrl(url: string): boolean {
  try {
    return Boolean(new URL(url).origin);
  } catch {
    return false;
  }
}
