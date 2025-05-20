"use client";

import { Button } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useRouter } from "@/i18n/routing";
import { useEditor } from "@/contexts/EditorProvider";
import { usePostArchiveMutation } from "@/hooks/api/archive";
import { converElementTo } from "@/common/utils/archiveUtil";
import api from "@/lib/api";

export default function EditorFooter() {
  const router = useRouter();

  return (
    <div className="bg-reverse w-full flex justify-center items-center p-2">
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
        >
          <p className="fg-principal font-bold">저장</p>
        </Button>
      </div>
    </div>
  );
}
