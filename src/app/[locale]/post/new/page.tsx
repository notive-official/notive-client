"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "@/i18n/routing";
import { DocumentTextIcon, LinkIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function PostPage() {
  useRequireAuth();
  const router = useRouter();
  const { PostTrans } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-5">
      <div className="flex flex-col items-center gap-8 w-full max-w-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">New Archive</h1>
          <p className="text-sm text-muted-foreground mt-2">Choose what you want to create</p>
        </div>

        <div className="flex flex-col w-full gap-3">
          <button
            className="flex items-center gap-4 w-full p-5 rounded-xl border border-border hover:border-ring hover:shadow-sm transition-all cursor-pointer group text-left"
            onClick={() => router.push("/post/new/note")}
          >
            <div className="w-11 h-11 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <DocumentTextIcon className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-foreground">{PostTrans("note.name")}</p>
              <p className="text-sm text-muted-foreground mt-0.5 whitespace-pre-line leading-relaxed">{PostTrans("note.description")}</p>
            </div>
            <ArrowRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>

          <button
            className="flex items-center gap-4 w-full p-5 rounded-xl border border-border hover:border-ring hover:shadow-sm transition-all cursor-pointer group text-left"
            onClick={() => router.push("/post/new/reference")}
          >
            <div className="w-11 h-11 rounded-lg bg-foreground flex items-center justify-center shrink-0">
              <LinkIcon className="w-5 h-5 text-surface" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-foreground">{PostTrans("reference.name")}</p>
              <p className="text-sm text-muted-foreground mt-0.5 whitespace-pre-line leading-relaxed">{PostTrans("reference.description")}</p>
            </div>
            <ArrowRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
