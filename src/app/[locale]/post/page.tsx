"use client";

import ArchiveSetting from "@/components/editor/ArchiveSetting";
import Editor from "@/components/editor/Editor";
export default function CreatePage() {
  return (
    <div className="h-full w-full flex flex-col md:flex-row items-center mx-auto">
      {/* 모바일(기본) - 한 컨테이너에 같이 배치 */}
      {/* <div className="flex flex-col w-full md:hidden p-4 gap-8">
        <ArchiveSetting />
        <Editor />
      </div> */}

      {/* md 이상 - section으로 분리 */}
      <div className="flex flex-col md:flex-row justify-center w-full h-full md:py-8 p-6 gap-4 md:gap-8">
        <section className="md:min-w-32 md:max-w-72 h-fit w-full">
          <ArchiveSetting />
        </section>
        <section className="relative md:min-w-xl max-w-3xl h-full overflow-y-auto text-center w-full">
          <Editor />
        </section>
      </div>
    </div>
  );
}
