"use client";

import customizeIframeHtml, { extractSrc } from "@/common/htmlParser";
import { GetOEmbed, useGetOEmbedQuery } from "@/hooks/api/archive/oembed";
import { useCallback, memo, useMemo } from "react";
import { ArrowTopRightOnSquareIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export function LinkDetailView({ url }: { url: string }) {
  const { data: oEmbed, isError } = useGetOEmbedQuery({
    url: GetOEmbed.url(), key: GetOEmbed.key(url), params: { url },
    options: { enabled: url.length > 0, retry: false, staleTime: 1000 * 60 * 5, refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false },
  });

  const customizedHtml = useMemo(() => {
    if (!oEmbed?.html) return "";
    return customizeIframeHtml(extractSrc(oEmbed.html), {});
  }, [oEmbed?.html]);

  const handleClick = useCallback(() => {
    window.open(url, "_blank", "width=900,height=700,scrollbars=yes");
  }, [url]);

  if (isError) {
    return (
      <button onClick={handleClick} className="inline-flex items-center gap-2 text-base text-secondary hover:text-foreground transition-colors cursor-pointer">
        <GlobeAltIcon className="w-5 h-5 shrink-0" />
        <span className="underline underline-offset-4 break-all text-left">{url}</span>
      </button>
    );
  }

  if (!oEmbed) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <GlobeAltIcon className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{oEmbed.providerName}</span>
        </div>
        <button onClick={handleClick} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />Open
        </button>
      </div>
      {customizedHtml && (
        <div key="oembed" className="oembed-container w-full aspect-video bg-muted rounded-xl overflow-hidden" dangerouslySetInnerHTML={{ __html: customizedHtml }} />
      )}
      <p className="text-xs text-muted-foreground/40 break-all">{url}</p>
    </div>
  );
}

export default memo(LinkDetailView);
