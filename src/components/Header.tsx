"use client";

import { Button } from "@headlessui/react";
import { GetUser, useGetUserQuery } from "@/hooks/api/user";
import Pop from "./common/Pop";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";
import useTrans from "@/hooks/useTranslation";
import PopButton from "./common/PopButton";
import { ReactNode } from "react";
import {
  UserIcon,
  ArchiveBoxIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { DEFAULT_PROFILE_PATH } from "@/common/consts/defaultImage";

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
    url: GetUser.url(),
    key: GetUser.key(),
    options: {
      staleTime: 1000 * 60 * 5,
      enabled: isAuthenticated,
    },
  });

  const popTopEntries: PopEntry[] = [
    {
      title: HeaderTrans("userMenu.myPage.title"),
      onClick: () => router.push("/my"),
      icon: <UserIcon className="w-6 h-6 text-muted-foreground" />,
    },
    {
      title: HeaderTrans("userMenu.archive.title"),
      onClick: () => router.push("/archive/note"),
      icon: <ArchiveBoxIcon className="w-6 h-6 text-muted-foreground" />,
    },
    {
      title: HeaderTrans("userMenu.posting.title"),
      onClick: () => router.push("/post/new"),
      icon: <PencilIcon className="w-6 h-6 text-muted-foreground" />,
    },
  ];

  const popBottomEntries: PopEntry[] = [
    {
      title: HeaderTrans("userMenu.signOut.title"),
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
    <header className="w-full p-4 flex justify-between shadow-md text-foreground bg-primary">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <p
        className="flex flex-row items-center font-bold text-2xl cursor-pointer"
        onClick={handleLogoClick}
      >
        <Image
          className="w-7 h-7 mr-3"
          src="/icons/favicon-dark.ico"
          width={32}
          height={32}
          unoptimized
          alt={"icon"}
        />
        {HeaderTrans("serviceName")}
      </p>
      {!isAuthLoading && !isUserLoading && isAuthenticated && data ? (
        <>
          <Pop
            node={
              <div className="flex flex-row items-center m-2 gap-2">
                <Image
                  className="w-7 h-7 rounded-full bg-white"
                  src={data.profileImagePath ?? DEFAULT_PROFILE_PATH}
                  width={30}
                  height={30}
                  alt="profile image"
                />
                <p className="text-md font-medium text-current">
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
          className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-foreground hover-bg-effect"
        >
          {HeaderTrans("signIn.buttonName")}
        </Button>
      )}
    </header>
  );
}
