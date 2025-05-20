"use client";

import Card from "@/components/common/Card";
import InputBox from "@/components/common/InputBox";
import Footer from "@/components/Footer";
import useTrans from "@/hooks/translation";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function MainPage() {
  const { MainTrans } = useTrans();
  const [search, setSearch] = useState("");

  return (
    <div className="h-full flex flex-col items-center justify-between px-5 py-2">
      <div>
        <section className="py-10 flex justify-center w-full text-center p-4">
          <div className="flex items-center justify-center w-full max-w-120">
            <InputBox
              placeholder={MainTrans("search.placeholder")}
              handleChange={(e) => setSearch(e.target.value)}
              value={search}
              icon={<MagnifyingGlassIcon className="w-6 h-6" />}
            />
          </div>
        </section>
        <section className="w-full text-center p-4 mb-10">
          <h1 className="text-3xl font-bold mb-3">{MainTrans("pageTitle")}</h1>
          <p className="fg-assistant">{MainTrans("description")}</p>
        </section>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card />
          <Card />
          <Card />
        </section>
      </div>
      <Footer />
    </div>
  );
}
