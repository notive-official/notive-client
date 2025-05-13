"use client";

import { Button } from "@headlessui/react";
import { useGetUserQuery } from "@/hooks/api/get";
import Pop, { PopEntry } from "./Pop";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/routing";
import Favicon from "@/../public/icons/favicon-light.ico";
import Image from "next/image";
import useTrans from "@/hooks/translation";

export default function Header() {
  const { HeaderTrans } = useTrans();
  const router = useRouter();
  const { isAuthenticated, logout, isLoading: isAuthLoading } = useAuth();

  const handleLogoClick = () => {
    router.push("/");
  };
  const handleLogin = () => {
    router.push("/login");
  };

  const {
    isLoading: isUserLoading,
    data,
    isError,
  } = useGetUserQuery({
    staleTime: 1000 * 60 * 5,
    enabled: isAuthenticated,
  });

  const popTopEntries: PopEntry[] = [
    {
      title: HeaderTrans("userMenu.myPage.title"),
      content: HeaderTrans("userMenu.myPage.content"),
      onClick: () => router.push("/my"),
    },
    {
      title: HeaderTrans("userMenu.archive.title"),
      content: HeaderTrans("userMenu.archive.content"),
      onClick: () => router.push("/"),
    },
    {
      title: HeaderTrans("userMenu.posting.title"),
      content: HeaderTrans("userMenu.posting.content"),
      onClick: () => router.push("/post"),
    },
  ];

  const popBottomEntries: PopEntry[] = [
    {
      title: HeaderTrans("userMenu.signOut.title"),
      content: HeaderTrans("userMenu.signOut.content"),
      onClick: () => logout(),
    },
  ];

  return (
    <header className="w-full p-4 flex justify-between shadow-md fg-principal bg-secondary">
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
            node={
              <div className="flex flex-row items-center">
                <UserCircleIcon className="w-8 h-8 flex-shrink-0" />
                <p className="mx-2 text-sm font-medium text-current">
                  {data?.nickname}
                </p>
              </div>
            }
            popTopEntries={popTopEntries}
            popBottomEntries={popBottomEntries}
          />
        </>
      ) : (
        <Button
          onClick={handleLogin}
          className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium fg-principal hover-bg-effect"
        >
          {HeaderTrans("signIn.buttonName")}
        </Button>
      )}
    </header>
  );
}
