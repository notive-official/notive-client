import { Input } from "@headlessui/react";
import Tagbar from "./Tagbar";
import { useEditor } from "@/contexts/EditorContext";
import useTranslation from "@/hooks/useTranslation";
import InputBox from "../common/InputBox";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";
import LinkDetailView from "../viewer/LinkDetailView";
import { isValidHttpUrl } from "@/common/utils";
import { useErrorBar } from "@/contexts/ErrorBarContext";

interface LinkEditorProps {
  link: string;
}

export function LinkEditor() {
  const { PostTrans } = useTranslation();
  const { state, setState } = useEditor();

  const changeTitle = (newTitle: string) => {
    setState({ ...state, title: newTitle });
  };

  const changeUrl = (newUrl: string) => {
    setState({ ...state, url: newUrl });
  };
  const [url, setUrl] = useState("");
  const { pushWarning } = useErrorBar();

  const handleEvent = useCallback(() => {
    if (!isValidHttpUrl(url)) {
      return pushWarning("Invalid Url");
    }
    changeUrl(url.trim());
    setUrl("");
  }, [changeUrl, url]);

  return (
    <div className="pb-32">
      <Input
        value={state.title}
        className="px-6 py-4 bg-reverse-5 w-full rounded-xl data-focus-outline-effect"
        placeholder={PostTrans("title.placeholder")}
        onChange={(e) => changeTitle(e.target.value)}
      />
      <Tagbar />
      <div className="flex flex-col justify-between items-center">
        <InputBox
          value={url}
          placeholder={PostTrans("link.placeholder")}
          handleChange={setUrl}
          onAction={handleEvent}
          buttonIcon={<ArrowUpIcon className="w-5 h-5" />}
        />

        {state.url && <LinkDetailView url={state.url} />}
      </div>
    </div>
  );
}
