"use client";

import { Button } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useRouter } from "@/i18n/routing";
import { useEditor } from "@/contexts/EditorContext";
import {
  PostArchiveRequest,
  usePostArchiveMutation,
} from "@/hooks/api/archive";

export default function EditorFooter() {
  const router = useRouter();
  const { title, tags, blocks } = useEditor();
  const { mutate: postArchive } = usePostArchiveMutation();

  const onSave = () => {
    console.log("clicked");
    const req: PostArchiveRequest = {
      title,
      tags,
      blocks: blocks.map((block, idx) => {
        return {
          position: idx,
          type: block.type,
          payload: block.payload.content,
        };
      }),
    };
    postArchive(req);
  };

  return (
    <div className="fixed bottom-0 left-0 z-10 bg-reverse w-full flex justify-center items-center p-2">
      <div className="cursor-pointer rounded-xl">
        <Button
          onClick={() => router.back()}
          className={
            "flex flex-row items-center gap-2 py-1.5 px-6 rounded-xl cursor-pointer click-effect"
          }
        >
          <ArrowLeftIcon className="w-4 h-4 fg-reverse" />
          <p className="fg-reverse">돌아가기</p>
        </Button>
      </div>
      <div className="cursor-pointer bg-transparent-75 rounded-xl">
        <Button
          className={"py-1.5 px-6 rounded-xl cursor-pointer click-effect"}
          onClick={onSave}
        >
          <p className="fg-principal font-bold">저장</p>
        </Button>
      </div>
    </div>
  );
}
