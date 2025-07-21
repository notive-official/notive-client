"use client";

import { Button } from "@headlessui/react";
import { useGetUserQuery } from "@/hooks/api/auth";
import Pop from "./common/Pop";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";
import useTrans from "@/hooks/translation";
import PopButton from "./common/PopButton";
import { ReactNode } from "react";
import {
  UserIcon,
  ArchiveBoxIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

interface PopEntry {
  title: string;
  onClick: () => void;
  icon?: ReactNode;
  description?: string;
}

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

  const { isLoading: isUserLoading, data } = useGetUserQuery({
    staleTime: 1000 * 60 * 5,
    enabled: isAuthenticated,
  });

  const popTopEntries: PopEntry[] = [
    {
      title: HeaderTrans("userMenu.myPage.title"),
      description: HeaderTrans("userMenu.myPage.content"),
      onClick: () => router.push("/my"),
      icon: <UserIcon className="w-6 h-6" />,
    },
    {
      title: HeaderTrans("userMenu.archive.title"),
      description: HeaderTrans("userMenu.archive.content"),
      onClick: () => router.push("/"),
      icon: <ArchiveBoxIcon className="w-6 h-6" />,
    },
    {
      title: HeaderTrans("userMenu.posting.title"),
      description: HeaderTrans("userMenu.posting.content"),
      onClick: () => router.push("/post"),
      icon: <PencilIcon className="w-6 h-6" />,
    },
  ];

  const popBottomEntries: PopEntry[] = [
    {
      title: HeaderTrans("userMenu.signOut.title"),
      description: HeaderTrans("userMenu.signOut.content"),
      onClick: () => logout(),
    },
  ];

  const popTopNode = popTopEntries.map((entry) => {
    return (
      <PopButton
        key={entry.title}
        title={entry.title}
        onClick={entry.onClick}
        icon={entry.icon}
      />
    );
  });

  const popBottomNode = popBottomEntries.map((entry) => {
    return (
      <PopButton
        key={entry.title}
        title={entry.title}
        onClick={entry.onClick}
        textCenter={true}
      />
    );
  });

  return (
    <header className="w-full p-4 flex justify-between shadow-md fg-principal bg-secondary">
      <p
        className="flex flex-row items-center font-bold text-2xl cursor-pointer"
        onClick={handleLogoClick}
      >
        <Image
          className="w-8 h-8 mr-2"
          src="/icons/favicon-dark.ico"
          width={32}
          height={32}
          alt={"icon"}
        />
        {HeaderTrans("serviceName")}
      </p>
      {!isAuthLoading && !isUserLoading && isAuthenticated && data ? (
        <>
          <Pop
            node={
              <div className="flex flex-row items-center m-1">
                <Image
                  className="w-8 h-8 flex-shrink-0"
                  src={data.profileImageUrl}
                  width={30}
                  height={30}
                  alt="profile image"
                />
                <p className="mx-2 text-sm font-medium text-current">
                  {data.nickname}
                </p>
              </div>
            }
            popTopNode={popTopNode}
            popBottomNode={popBottomNode}
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
