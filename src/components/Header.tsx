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
import { UserIcon, ArchiveBoxIcon, PencilIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { DEFAULT_PROFILE_PATH } from "@/common/consts/defaultImage";

interface PopEntry { title: string; onClick: () => void; icon?: ReactNode }

export default function Header() {
  const { HeaderTrans } = useTrans();
  const router = useRouter();
  const { isAuthenticated, logout, isLoading: isAuthLoading } = useAuth();
  const { isLoading: isUserLoading, data } = useGetUserQuery({
    url: GetUser.url(), key: GetUser.key(),
    options: { staleTime: 1000 * 60 * 5, enabled: isAuthenticated },
  });

  const popTop: PopEntry[] = [
    { title: HeaderTrans("userMenu.myPage.title"), onClick: () => router.push("/my"), icon: <UserIcon className="w-5 h-5" /> },
    { title: HeaderTrans("userMenu.archive.title"), onClick: () => router.push("/archive/note"), icon: <ArchiveBoxIcon className="w-5 h-5" /> },
    { title: HeaderTrans("userMenu.posting.title"), onClick: () => router.push("/post/new"), icon: <PencilIcon className="w-5 h-5" /> },
  ];
  const popBottom: PopEntry[] = [
    { title: HeaderTrans("userMenu.signOut.title"), onClick: () => logout(), icon: <ArrowRightStartOnRectangleIcon className="w-5 h-5" /> },
  ];

  return (
    <header className="shrink-0 w-full h-14 px-5 md:px-8 flex justify-between items-center border-b border-border bg-surface sticky top-0 z-30">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => router.push("/")}>
        <Image className="w-6 h-6" src="/icons/favicon-dark.ico" width={24} height={24} unoptimized alt="icon" />
        <span className="font-semibold text-base tracking-tight text-foreground">{HeaderTrans("serviceName")}</span>
      </div>
      {!isAuthLoading && (
        !isUserLoading && isAuthenticated && data ? (
          <Pop
            node={
              <div className="flex items-center gap-2.5 py-1 px-1">
                <Image className="w-8 h-8 rounded-full object-cover ring-1 ring-border" src={data.profileImagePath ?? DEFAULT_PROFILE_PATH} width={32} height={32} alt="profile" />
                <span className="text-sm font-medium text-secondary hidden sm:block">{data.nickname}</span>
              </div>
            }
            popTopNode={popTop.map((e) => <PopButton key={e.title} title={e.title} onClick={e.onClick} icon={e.icon} />)}
            popBottomNode={popBottom.map((e) => <PopButton key={e.title} title={e.title} onClick={e.onClick} icon={e.icon} />)}
          />
        ) : (
          <Button onClick={() => router.push("/login")} className="cursor-pointer text-sm font-medium text-secondary hover:text-foreground transition-colors">
            {HeaderTrans("signIn.buttonName")}
          </Button>
        )
      )}
    </header>
  );
}
