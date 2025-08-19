import type { ImageLoaderProps } from "next/image";

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const cfBase = (process.env.NEXT_PUBLIC_CLOUD_FRONT_BASE || "").replace(
    /\/+$/,
    ""
  );
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/+$/, "");

  if (src.startsWith("/icons") || src.startsWith("/images")) return src;

  if (!isAbsoluteUrl(src)) {
    const normalized = src.startsWith("/") ? src : `/${src}`;
    const encPath = encodeURI(normalized);
    return `${cfBase}${encPath}`;
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
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
