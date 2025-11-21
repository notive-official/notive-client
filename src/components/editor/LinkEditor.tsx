import { useEditor } from "@/contexts/EditorContext";
import useTranslation from "@/hooks/useTranslation";
import InputBox from "../common/InputBox";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";
import LinkDetailView from "../viewer/LinkDetailView";
import { isValidHttpUrl } from "@/common/utils";
import { useErrorBar } from "@/contexts/ErrorBarContext";
import { GetOEmbed, useGetOEmbedQuery } from "@/hooks/api/archive/oembed";

export function LinkEditor() {
  const { PostTrans } = useTranslation();
  const { state, setState } = useEditor();

  const [url, setUrl] = useState("");
  const { pushWarning } = useErrorBar();

  const { data: oEmbed, refetch } = useGetOEmbedQuery({
    url: GetOEmbed.url(),
    key: GetOEmbed.key(state.url),
    params: { url: state.url },
    options: {
      enabled: state.url.length > 0,
      retry: false,
      staleTime: 1000 * 60 * 5, // 5분
      refetchOnWindowFocus: false, // 포커스시 X
      refetchOnReconnect: false, // 재연결시 X
      refetchOnMount: false,
    },
  });

  useEffect(() => {
    if (state.url.length > 0) {
      refetch();
    }
  }, [state.url, refetch]);

  useEffect(() => {
    setState({
      ...state,
      thumbnail: oEmbed ? { path: oEmbed?.thumbnailUrl, file: null } : null,
    });
  }, [oEmbed]);

  const changeUrl = (newUrl: string) => {
    setState({
      ...state,
      url: newUrl,
    });
  };

  const handleEvent = useCallback(() => {
    if (!isValidHttpUrl(url)) {
      return pushWarning("Invalid Url");
    }
    changeUrl(url.trim());
    setUrl("");
  }, [changeUrl, url]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-full">
        <InputBox
          value={url}
          placeholder={PostTrans("link.placeholder")}
          handleChange={setUrl}
          onAction={handleEvent}
          buttonIcon={<ArrowUpIcon className="w-5 h-5" />}
        />

        <div className="flex flex-col">
          {state.url !== "" ? (
            <LinkDetailView url={state.url} />
          ) : (
            <div className="flex flex-col w-full p-4 gap-2">
              <div className="w-sm rounded-2xl bg-muted h-8"></div>
              <div className="w-3xs rounded-2xl bg-muted h-8"></div>
              <div className="w-full rounded-2xl bg-muted h-72"></div>
              <div className="w-full rounded-2xl bg-muted h-8"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
