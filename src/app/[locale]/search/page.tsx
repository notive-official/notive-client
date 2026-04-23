"use client";

import MainCard from "@/components/archive/MainCard";
import InputBox from "@/components/common/InputBox";
import useTrans from "@/hooks/useTranslation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Search, SearchReqParam, SearchResponse, useSearchQuery } from "@/hooks/api/search";
import InfiniteScroll from "@/components/common/InfiniteScroll";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import TagSearchBar from "@/components/archive/TagSearchBar";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const tags = searchParams.get("tags");
  const { MainTrans } = useTrans();
  const [query, setQuery] = useState(q ?? "");
  const [search, setSearch] = useState<SearchReqParam>({ q: query, tags: tags ?? undefined });
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [payloads, setPayloads] = useState<SearchResponse[]>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const result = useSearchQuery({ url: Search.url(), key: Search.key(search), params: search, options: { staleTime: 5 * 60 * 1000 } });

  const searchedTags = [...new Set(result.data?.pages.flatMap((p) => p.content.flatMap((a) => a.tags)))];

  useEffect(() => {
    if (!result.data) return;
    const all = result.data.pages.flatMap((p) => p.content);
    setPayloads(!selectedTag ? all : all.filter((c) => c.tags.includes(selectedTag)));
  }, [selectedTag, result.data]);

  return (
    <div ref={scrollRef} className="h-full flex flex-col">
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 flex flex-col flex-1 gap-6">
        <section className="pt-8">
          <div className="w-full max-w-lg">
            <InputBox placeholder={MainTrans("search.placeholder")} handleChange={setQuery} value={query}
              buttonIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
              onAction={(v) => setSearch({ q: v === "" ? undefined : v })} />
          </div>
        </section>
        {searchedTags.length > 0 && <TagSearchBar tags={searchedTags} onClick={(v) => setSelectedTag(v)} selectedTag={selectedTag} />}
        <InfiniteScroll result={result} root={scrollRef} payloads={payloads} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {(a) => <MainCard key={a.id} id={a.id} title={a.title} thumbnailPath={a.thumbnailPath} writer={a.writer} />}
        </InfiniteScroll>
      </div>
      <Footer />
    </div>
  );
}
