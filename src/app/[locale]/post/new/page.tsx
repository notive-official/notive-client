"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "@/i18n/routing";
import { Button } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

export default function PostPage() {
  useRequireAuth();
  const router = useRouter();
  const { PostTrans } = useTranslation();

  return (
    <div className="flex flex-col justify-between items-center w-full h-full">
      <section className="h-16" />
      <div className="flex flex-col md:flex-row w-fit h-fit justify-center items-center gap-16 p-4">
        {/* Note */}
        <div
          className="flex flex-col justify-between w-full max-w-sm h-full overflow-hidden rounded-2xl bg-muted p-6 text-left align-middle shadow-xl gap-4"
          onClick={() => router.push(`/post/new/note`)}
        >
          {/* title */}
          <p className="text-xl font-medium leading-6 text-foreground pb-4">
            {PostTrans("note.name")}
          </p>
          {/* description */}
          <p className="text-foreground whitespace-pre-line">
            {PostTrans("note.description")}
          </p>
          {/* button */}
          <div className="flex justify-end items-center">
            <Button className="flex flex-row gap-2 w-fit shadow-lg px-4 py-2 cursor-pointer rounded-xl bg-primary text-on-primary">
              <p>{PostTrans("note.button")}</p>
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
        {/* Reference */}
        <div
          className="flex flex-col justify-between w-full max-w-sm h-full overflow-hidden rounded-2xl bg-primary p-6 text-left align-middle shadow-xl gap-4"
          onClick={() => router.push(`/post/new/reference`)}
        >
          {/* title */}
          <p className="text-xl font-medium leading-6 text-on-primary pb-4">
            {PostTrans("reference.name")}
          </p>
          {/* description */}
          <p className="text-on-primary whitespace-pre-line">
            {PostTrans("reference.description")}
          </p>
          {/* button */}
          <div className="flex justify-end items-center">
            <Button className="flex flex-row gap-2 w-fit shadow-lg px-4 py-2 cursor-pointer rounded-xl bg-muted text-foreground">
              <p>{PostTrans("reference.button")}</p>
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      <section className="h-32" />
    </div>
  );
}
