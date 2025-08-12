"use client";

import MainCard from "@/components/common/MainCard";
import InputBox from "@/components/common/InputBox";
import useTrans from "@/hooks/useTranslation";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useListArchivesQuery } from "@/hooks/api/search";

export default function MainPage() {
  const { MainTrans } = useTrans();
  const [search, setSearch] = useState("");

  const page = 0;
  const { data } = useListArchivesQuery({ page });

  return (
    <div className="h-full overflow-y-auto flex flex-col items-center px-5 py-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col flex-1">
        {/* 검색 박스 */}
        <section className="flex justify-center w-full text-center pt-10">
          <div className="flex items-center justify-center w-full md:w-2/3 max-w-200">
            <InputBox
              placeholder={MainTrans("search.placeholder")}
              handleChange={setSearch}
              value={search}
              buttonIcon={<MagnifyingGlassIcon className="w-6 h-6" />}
            />
          </div>
        </section>

        {/* 메인 타이틀 */}
        <section className="w-full text-center py-10 md:py-20">
          <h1 className="text-3xl font-bold mb-3">{MainTrans("pageTitle")}</h1>
          <div className="fg-assistant">{MainTrans("description")}</div>
        </section>

        {/* 아카이브 목록 */}
        <div className="flex flex-wrap gap-8 justify-center">
          {data?.content.map((note) => {
            return (
              <div className="flex justify-center" key={note.id}>
                <MainCard
                  key={note.id}
                  title={note.title}
                  writer={note.writer}
                  thumbnailUrl={note.thumbnailPath}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
