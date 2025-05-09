"use client";

import { useTranslations } from "next-intl";
import PetCard from "@/components/Card";
import { usePathname, useRouter } from "@/i18n/routing";
import LocaleDropdown, { LocaledLanguage } from "@/components/LocaleDropDown";
import { Language } from "@/common/consts/language";
import InputBox from "@/components/InputBox";

export default function MainPage() {
  const tm = useTranslations("MainPage");
  const languageTrans = useTranslations("Language");

  const pathname = usePathname();
  const router = useRouter();

  const languages = Object.values(Language).map(
    (languageType): LocaledLanguage => ({
      languageType: languageType,
      expression: languageTrans(languageType),
    })
  );
  const handleLocaleChange = (locale: string) => {
    router.push(pathname, { locale });
  };

  return (
    <div className="h-dvh flex flex-col items-center justify-between px-5 py-2">
      <main>
        <section className="py-10 flex justify-center w-full text-center p-4">
          <InputBox
            label=""
            description=""
            placeholder={tm("search.placeholder")}
          />
        </section>
        <section className="w-full text-center p-4">
          <h1 className="text-3xl font-bold">{tm("pageTitle")}</h1>
          <p>{tm("description")}</p>
        </section>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PetCard
            name={tm("pets.dog.name")}
            description={tm("pets.dog.description")}
          />
          <PetCard
            name={tm("pets.dog.name")}
            description={tm("pets.dog.description")}
          />
        </section>
        <LocaleDropdown
          languages={languages}
          handleLocaleChange={handleLocaleChange}
        />
      </main>
      <footer className="w-full border-t text-light-fg-secondary dark:text-dark-fg-secondary bg-light-bg-secondary dark:bg-dark-bg-secondary text-center py-2">
        Nya Nya Inc.
      </footer>
    </div>
  );
}
