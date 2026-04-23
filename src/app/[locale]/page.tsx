"use client";

import MainCard from "@/components/archive/MainCard";
import InputBox from "@/components/common/InputBox";
import useTrans from "@/hooks/useTranslation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { Search, useSearchQuery } from "@/hooks/api/search";
import InfiniteScroll from "@/components/common/InfiniteScroll";
import Footer from "@/components/Footer";
import { useRouter } from "@/i18n/routing";

export default function MainPage() {
  const router = useRouter();
  const { MainTrans } = useTrans();
  const [query, setQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const result = useSearchQuery({ url: Search.url(), key: Search.key({}), options: { staleTime: 5 * 60 * 1000 } });

  return (
    <div ref={scrollRef} className="h-full flex flex-col">
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 flex flex-col flex-1">
        <section className="flex flex-col items-center pt-20 pb-16 md:pt-28 md:pb-20 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">{MainTrans("pageTitle")}</h1>
          <p className="text-base text-muted-foreground text-center max-w-md">{MainTrans("description")}</p>
          <div className="w-full max-w-lg mt-4">
            <InputBox placeholder={MainTrans("search.placeholder")} handleChange={setQuery} value={query}
              buttonIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
              onAction={() => router.push({ pathname: "/search", query: { q: query } })} />
          </div>
        </section>
        <InfiniteScroll result={result} root={scrollRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {(a) => <MainCard key={a.id} id={a.id} title={a.title} thumbnailPath={a.thumbnailPath} writer={a.writer} />}
        </InfiniteScroll>
      </div>
      <Footer />
    </div>
  );
}
