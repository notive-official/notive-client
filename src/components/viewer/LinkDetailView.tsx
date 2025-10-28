"use client";

import customizeIframeHtml, { extractSrc } from "@/common/htmlParser";
import { GetOEmbed, useGetOEmbedQuery } from "@/hooks/api/archive/oembed";
import { useCallback, memo, useMemo, useState } from "react";
import Image from "next/image";
import React from "react";
import useTranslation from "@/hooks/useTranslation";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";

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
    <div className="flex flex-col w-full gap-2">
      {oEmbed ? (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          {/* 썸네일 이미지 */}
          <div className="flex flex-col justify-center items-center rounded-lg h-full w-fit">
            {oEmbed.thumbnailUrl ? (
              <div
                className="relative group cursor-pointer rounded hover:drop-shadow-lg w-fit h-fit"
                onClick={handleClick}
              >
                <Image
                  src={oEmbed.thumbnailUrl}
                  alt={oEmbed.title}
                  width={20}
                  height={20}
                  priority
                  className="object-cover w-auto h-auto rounded bg-white"
                />
                <p className="absolute bottom-2 right-2 bg-black/75 text-white py-1 px-2 rounded-full flex flex-row gap-1 text-sm opacity-0 transition group-hover:opacity-100">
                  <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                  {ViewTrans("link.visit")}
                </p>
              </div>
            ) : null}
          </div>

          {/* 정보 */}
          <div className="flex flex-col justify-start items-start h-full p-4 gap-4">
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
              className="oembed-container"
              dangerouslySetInnerHTML={{ __html: customizedHtml }}
            />
            <div className="text-sm text-reverse-25">{url}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default memo(LinkDetailView);
