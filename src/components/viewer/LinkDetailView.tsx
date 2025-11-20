"use client";

import customizeIframeHtml, { extractSrc } from "@/common/htmlParser";
import { GetOEmbed, useGetOEmbedQuery } from "@/hooks/api/archive/oembed";
import { useCallback, memo, useMemo } from "react";
import React from "react";
import useTranslation from "@/hooks/useTranslation";

export function LinkDetailView({ url }: { url: string }) {
  const { ViewTrans } = useTranslation();

  const { data: oEmbed, isError } = useGetOEmbedQuery({
    url: GetOEmbed.url(),
    key: GetOEmbed.key(url),
    params: { url },
    options: {
      enabled: url.length > 0,
      retry: false,
      staleTime: 1000 * 60 * 5, // 5분
      refetchOnWindowFocus: false, // 포커스시 X
      refetchOnReconnect: false, // 재연결시 X
      refetchOnMount: false,
    },
  });

  const customizedHtml = useMemo(() => {
    if (!oEmbed?.html) return "";
    const src = extractSrc(oEmbed.html);
    return customizeIframeHtml(src, {});
  }, [oEmbed?.html]);

  const handleClick = useCallback(() => {
    window.open(
      url,
      "myPopup",
      "width=800,height=600,toolbar=no,menubar=no,scrollbars=yes"
    );
  }, [url]);

  if (isError) {
    return (
      <p
        className="p-2 text-start underline text-blue-500 cursor-pointer hover:text-blue-600"
        onClick={handleClick}
      >
        {url}
      </p>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      {oEmbed ? (
        <div className="flex flex-col justify-center items-start w-full h-full p-4 gap-4">
          <h2
            className="text-foreground font-bold text-lg line-clamp-4 text-start"
            title={oEmbed.title}
          >
            {oEmbed.title}
          </h2>
          <p className="text-muted-foreground text-base">
            {oEmbed.providerName}
          </p>
          <div
            key="oembed-stable"
            className="oembed-container w-full h-full flex-1 min-h-[320px]"
            dangerouslySetInnerHTML={{ __html: customizedHtml }}
          />
          <div className="text-sm text-reverse-25">{url}</div>
        </div>
      ) : null}
    </div>
  );
}

export default memo(LinkDetailView);
