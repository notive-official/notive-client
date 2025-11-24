"use client";

import MainCard from "@/components/archive/MainCard";
import InputBox from "@/components/common/InputBox";
import useTrans from "@/hooks/useTranslation";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  SearchReqParam,
  SearchResponse,
  useSearchQuery,
} from "@/hooks/api/search";
import InfiniteScroll from "@/components/common/InfiniteScroll";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import TagSearchBar from "@/components/archive/TagSearchBar";
import { SearchParams } from "next/dist/server/request/search-params";

export default function MainPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const tags = searchParams.get("tags");

  const { MainTrans } = useTrans();
  const [query, setQuery] = useState<string>(q ?? "");
  const [search, setSearch] = useState<SearchReqParam>({
    q: query,
    tags: tags ?? undefined,
  });
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [payloads, setPayloads] = useState<SearchResponse[]>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const result = useSearchQuery({
    url: Search.url(),
    key: Search.key(search),
    params: search,
    options: { staleTime: 5 * 60 * 1000 },
  });

  const handleSearch = (query: string) => {
    setSearch({ q: query === "" ? undefined : query });
  };

  const searchedTags = [
    ...new Set(
      result.data?.pages.flatMap((page) =>
        page.content.flatMap((archive) => archive.tags)
      )
    ),
  ];

  useEffect(() => {
    if (!result.data) return;
    if (!selectedTag) {
      const filteredPayloads = result.data.pages.flatMap(
        (page) => page.content
      );
      setPayloads(filteredPayloads);
      return;
    }
    const filteredPayloads =
      result.data.pages
        .flatMap((page) => page.content)
        .filter((content) => content.tags.includes(selectedTag)) ?? [];
    setPayloads(filteredPayloads);
  }, [selectedTag, result.data]);

  return (
    <div
      ref={scrollRef}
      className="h-full flex flex-col items-center px-4 py-2"
    >
      <div className="container mx-auto sm:px-6 lg:px-8 py-2 flex flex-col flex-1 gap-4">
        {/* 검색 박스 */}
        <section className="flex justify-start w-full text-center pt-10">
          <div className="flex items-center justify-center w-full max-w-150">
            <InputBox
              placeholder={MainTrans("search.placeholder")}
              handleChange={setQuery}
              value={query}
              buttonIcon={<MagnifyingGlassIcon className="w-6 h-6" />}
              onAction={(v) => handleSearch(v)}
            />
          </div>
        </section>
        <TagSearchBar
          tags={searchedTags}
          onClick={(v) => setSelectedTag(v)}
          selectedTag={selectedTag}
        />

        {/* 아카이브 목록 */}
        <InfiniteScroll
          result={result}
          root={scrollRef}
          payloads={payloads}
          className="flex flex-wrap gap-8 justify-start"
        >
          {(archive) => (
            <div className="flex justify-center" key={archive.id}>
              <MainCard
                id={archive.id}
                title={archive.title}
                thumbnailPath={archive.thumbnailPath}
                writer={archive.writer}
              />
            </div>
          )}
        </InfiniteScroll>
      </div>
      <Footer />
    </div>
  );
}
