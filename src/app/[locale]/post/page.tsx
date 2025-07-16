"use client";

import Editor from "@/components/editor/Editor";
import Viewer from "@/components/viewer/Viewer";
export default function CreatePage() {
  return (
    <div className="h-full w-full flex flex-row mx-auto divide-x-4 divide-primary">
      <section className="w-1/2 h-full overflow-y-auto text-center p-4 pb-16">
        <Editor />
      </section>
      <section className="w-1/2 h-full overflow-y-auto text-left p-8 pb-16">
        <Viewer />
      </section>
    </div>
  );
}
