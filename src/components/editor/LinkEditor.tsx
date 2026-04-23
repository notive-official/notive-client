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
    url: GetOEmbed.url(), key: GetOEmbed.key(state.url), params: { url: state.url },
    options: { enabled: state.url.length > 0, retry: false, staleTime: 1000 * 60 * 5, refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false },
  });

  useEffect(() => { if (state.url.length > 0) refetch(); }, [state.url, refetch]);
  useEffect(() => {
    setState({ ...state, thumbnail: oEmbed ? { path: oEmbed?.thumbnailUrl, file: null } : null });
  }, [oEmbed]);

  const handleEvent = useCallback(() => {
    if (!isValidHttpUrl(url)) { pushWarning("Invalid URL"); return; }
    setState({ ...state, url: url.trim() });
    setUrl("");
  }, [url]);

  return (
    <div className="flex flex-col gap-6">
      <InputBox
        value={url}
        placeholder={PostTrans("link.placeholder")}
        handleChange={setUrl}
        onAction={handleEvent}
        buttonIcon={<ArrowUpIcon className="w-5 h-5" />}
      />
      {state.url !== "" ? (
        <LinkDetailView url={state.url} />
      ) : (
        <div className="flex flex-col gap-3 py-4">
          <div className="w-2/3 rounded-xl bg-muted h-5 animate-pulse" />
          <div className="w-1/3 rounded-xl bg-muted h-5 animate-pulse" />
          <div className="w-full rounded-xl bg-muted aspect-video animate-pulse" />
        </div>
      )}
    </div>
  );
}
