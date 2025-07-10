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
  const { title, tags, elements } = useEditor();
  const { mutate: postArchive } = usePostArchiveMutation();

  const onSave = () => {
    const form = new FormData();

    form.append("title", title);
    tags.forEach((t) => form.append("tags", t));
    const { links, images, texts } = converElementTo(elements);
    links.forEach((l, i) => {
      form.append(`links[${i}].sequence`, l.sequence.toString());
      l.urls.forEach((url) => form.append(`links[${i}].urls`, url));
    });

    texts.forEach((t, i) => {
      form.append(`texts[${i}].sequence`, t.sequence.toString());
      form.append(`texts[${i}].type`, t.type);
      form.append(`texts[${i}].content`, t.content);
    });

    // images는 sequence, description, files를 그룹으로 묶어 전송
    images.forEach((img, i) => {
      form.append(`images[${i}].sequence`, img.sequence.toString());
      form.append(`images[${i}].description`, img.description);
      img.files.forEach((file) => form.append(`images[${i}].files`, file));
    });

    console.log(links);
    api.post("/api/archive", form);
  };

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
          onClick={onSave}
        >
          <p className="fg-principal font-bold">저장</p>
        </Button>
      </div>
    </div>
  );
}
