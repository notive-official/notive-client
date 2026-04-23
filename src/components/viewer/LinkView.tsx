"use client";

import { GetOEmbed, useGetOEmbedQuery } from "@/hooks/api/archive/oembed";
import Image from "next/image";
import { useCallback, memo } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export function LinkView({ url }: { url: string }) {
  const { data: oEmbed, isError } = useGetOEmbedQuery({
    url: GetOEmbed.url(), key: GetOEmbed.key(url), params: { url },
    options: { enabled: Boolean(url), retry: false, staleTime: 1000 * 60 * 5, refetchOnWindowFocus: false },
  });

  const handleClick = useCallback(() => {
    window.open(url, "_blank", "width=900,height=700,scrollbars=yes");
  }, [url]);

  if (isError) {
    return (
      <div className="my-4">
        <button onClick={handleClick} className="inline-flex items-center gap-2 text-sm text-secondary hover:text-foreground underline underline-offset-4 cursor-pointer transition-colors">
          <ArrowTopRightOnSquareIcon className="w-4 h-4 shrink-0" /><span className="break-all text-left">{url}</span>
        </button>
      </div>
    );
  }
  if (!oEmbed) return null;

  return (
    <div className="my-6">
      <div className="flex border border-border rounded-xl overflow-hidden cursor-pointer hover:border-ring hover:shadow-sm transition-all" onClick={handleClick}>
        {oEmbed.thumbnailUrl && (
          <div className="relative w-36 md:w-48 shrink-0 bg-muted">
            <Image src={oEmbed.thumbnailUrl} alt={oEmbed.title} fill sizes="192px" className="object-cover" />
          </div>
        )}
        <div className="flex flex-col justify-center gap-1.5 p-5 min-w-0">
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">{oEmbed.title}</h3>
          <span className="text-xs text-muted-foreground">{oEmbed.providerName}</span>
          <span className="text-xs text-muted-foreground/50 break-all line-clamp-1 mt-0.5">{url}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(LinkView);
