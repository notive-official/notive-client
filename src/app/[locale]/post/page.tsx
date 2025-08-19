"use client";

import ArchiveSetting from "@/components/editor/ArchiveSetting";
import Editor from "@/components/editor/Editor";
import { useRequireAuth } from "@/hooks/useRequireAuth";
export default function PostPage() {
  useRequireAuth();

  return (
    <div className="h-full w-full flex flex-col md:flex-row items-center mx-auto">
      <div className="flex flex-col md:flex-row justify-center w-full h-full md:py-8 p-4 gap-4 md:gap-8 overflow-y-auto lg:overflow-hidden">
        <section className="md:min-w-32 md:max-w-72 h-fit w-full">
          <ArchiveSetting />
        </section>
        <section className="relative md:min-w-xl max-w-3xl h-full lg:overflow-y-auto text-center w-full">
          <Editor />
        </section>
      </div>
    </div>
  );
}
