"use client";

import { Button } from "@headlessui/react";
import { useGetUserQuery } from "@/hooks/api/get";
import Pop, { PopFuncEntry, PopLinkEntry } from "../../components/Pop";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import Favicon from "@/../public/icons/favicon.ico";
import Image from "next/image";

export default function Header() {
  const HeaderTrans = useTranslations("Header");
  const router = useRouter();
  const { isAuthenticated, logout, isLoading: isAuthLoading } = useAuth();

  const handleLogoClick = () => {
    router.push("/");
  };
  const handleLogin = () => {
    router.push("/auth/login");
  };

  const {
    isLoading: isUserLoading,
    data,
    isError,
  } = useGetUserQuery({
    staleTime: 1000 * 60 * 5,
    enabled: isAuthenticated,
  });

  const popLinkEntries: PopLinkEntry[] = [
    {
      title: HeaderTrans("userMenu.myPage.title"),
      content: HeaderTrans("userMenu.myPage.content"),
      link: "/",
    },
    {
      title: HeaderTrans("userMenu.setting.title"),
      content: HeaderTrans("userMenu.setting.content"),
      link: "/",
    },
    {
      title: HeaderTrans("userMenu.scrap.title"),
      content: HeaderTrans("userMenu.scrap.content"),
      link: "/",
    },
  ];

  const popFuncEntries: PopFuncEntry[] = [
    {
      title: HeaderTrans("userMenu.signOut.title"),
      content: HeaderTrans("userMenu.signOut.content"),
      onClick: () => logout(),
    },
  ];

  return (
    <header className="w-full p-4 flex justify-between shadow-md fg-secondary bg-secondary">
      <p
        className="flex flex-row items-center font-bold text-2xl cursor-pointer"
        onClick={handleLogoClick}
      >
        <Image className="w-8 h-8 mr-2" src={Favicon} alt={"icon"} />
        {HeaderTrans("serviceName")}
      </p>
      {isAuthLoading ? null : isAuthenticated ? (
        <>
          <Pop
            node={<UserCircleIcon className="w-8 h-8 flex-shrink-0" />}
            popLinkEntries={popLinkEntries}
            popFuncEntries={popFuncEntries}
          />
        </>
      ) : (
        <Button
          onClick={handleLogin}
          className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium fg-secondary hover-bg-effect"
        >
          {HeaderTrans("signIn.buttonName")}
        </Button>
      )}
    </header>
  );
}
