"use client";

import { GetOEmbed, useGetOEmbedQuery } from "@/hooks/api/archive/oembed";
import Image from "next/image";
import { useCallback, memo } from "react";

export function LinkView({ url }: { url: string }) {
  const { data: oEmbed, isError } = useGetOEmbedQuery({
    url: GetOEmbed.url(),
    key: GetOEmbed.key(url),
    params: { url },
    options: {
      enabled: Boolean(url),
      retry: false,
      staleTime: 1000 * 60 * 5, // 5분
      refetchOnWindowFocus: false,
    },
  });

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
    <div className="w-full">
      {oEmbed ? (
        <div
          className="bg-muted rounded-lg overflow-hidden shadow-lg h-48"
          onClick={handleClick}
        >
          <div className="cursor-pointer hover-bg-effect flex flex-row h-full">
            {oEmbed.thumbnailUrl ? (
              <div className="p-6 w-4/7 relative overflow-hidden h-full">
                <Image
                  src={oEmbed.thumbnailUrl}
                  alt={oEmbed.title}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="flex flex-col justify-between items-start w-fill p-6">
              <h2
                className="text-foreground font-bold text-lg line-clamp-4 text-start"
                title={oEmbed.title}
              >
                {oEmbed.title}
              </h2>
              <p className="text-muted-foreground text-base pl-2">
                {oEmbed.providerName}
              </p>
            </div>
          </div>
        </div>
      ) : null}
      <div className="p-1 w-full text-sm text-muted-foreground break-all line-clamp-1">
        {url}
      </div>
    </div>
  );
}

export default memo(LinkView);
