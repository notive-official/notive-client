"use client";

import { Button } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useRouter } from "@/i18n/routing";
import { useBlockEditor } from "@/contexts/BlockEditorContext";
import { useEditor } from "@/contexts/EditorContext";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

export default function EditorFooter() {
  const router = useRouter();
  const { blocks } = useBlockEditor();
  const { title, tags, group, isPublic, thumbnail } = useEditor();
  const queryClient = useQueryClient();

  const onSave = () => {
    const form = new FormData();
    if (!group || title.trim().length === 0 || blocks.length === 0) return; // TODO: 에러 핸들링

    if (thumbnail) form.append("thumbnailImage", thumbnail);
    form.append("isPublic", String(isPublic));
    form.append("groupId", String(group.id));
    form.append("title", title);
    tags.forEach((t, i) => form.append(`tags[${i}]`, t));

    blocks.forEach((b, idx) => {
      form.append(`blocks[${idx}].position`, String(idx));
      if (
        (b.type === "image" && !b.payload.file) ||
        (b.type === "link" && b.payload.content.length < 1)
      ) {
        form.append(`blocks[${idx}].content`, "");
        form.append(`blocks[${idx}].blockType`, "paragraph".toUpperCase());
        return;
      }
      form.append(`blocks[${idx}].blockType`, b.type.toUpperCase());
      form.append(`blocks[${idx}].content`, b.payload.content);
      if (b.payload.file) form.append(`blocks[${idx}].image`, b.payload.file);
    });

    api
      .post("/api/archive", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["listTags"] });
        router.replace("/");
      });
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
