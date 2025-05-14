"use client";

import useTrans from "@/hooks/translation";
import { usePathname, useRouter } from "@/i18n/routing";
import { LanguageIcon } from "@heroicons/react/16/solid";
import DropDown, { Item } from "@/components/common/DropDown";
import { Language } from "@/common/consts/language";

export default function MyPage() {
  const { MyTrans, LanguageSelectTrans } = useTrans();

  const pathname = usePathname();
  const router = useRouter();

  const languages = Object.values(Language).map(
    (languageType): Item => ({
      name: LanguageSelectTrans(languageType),
      handleClick: () => router.push(pathname, { locale: languageType }),
    })
  );
  return (
    <div className="h-dvh flex flex-col items-center justify-between px-5 py-2">
      <div className="w-full max-w-md rounded-xl bg-transparent-reverse p-6 backdrop-blur-2xl">
        <h1>{MyTrans("pageTitle")}</h1>
        <p>{MyTrans("description")}</p>
        <DropDown
          node={<LanguageIcon className="size-4" />}
          items={languages}
        />
      </div>
    </div>
  );
}
