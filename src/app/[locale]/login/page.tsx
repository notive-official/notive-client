"use client";

import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import useTrans from "@/hooks/useTranslation";

export default function LoginPage() {
  const { LoginTrans } = useTrans();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => { if (isAuthenticated) router.replace("/"); }, [isAuthenticated, router]);

  return (
    <div className="flex w-full h-full items-center justify-center px-5">
      <div className="flex flex-col items-center gap-10 w-full max-w-sm">
        <div className="flex flex-col items-center gap-3">
          <Image className="w-10 h-10" src="/icons/favicon-dark.ico" width={40} height={40} alt="icon" />
          <h3 className="text-2xl font-bold tracking-tight">{LoginTrans("title")}</h3>
          <p className="text-sm text-muted-foreground text-center leading-relaxed">{LoginTrans("content")}</p>
        </div>
        <div className="flex flex-col items-center gap-4 w-full">
          <Link className="block w-full max-w-[260px]" href={process.env.NEXT_PUBLIC_API_BASE + "/oauth2/authorization/google"}>
            <Image className="w-full hover:opacity-90 transition-opacity rounded-full" src="/images/signin-google-rd.png" width={260} height={52} alt="sign in" />
          </Link>
          <div className="flex items-center w-full max-w-[260px]">
            <div className="flex-1 h-px bg-border" /><span className="px-4 text-xs text-muted-foreground">or</span><div className="flex-1 h-px bg-border" />
          </div>
          <Link className="block w-full max-w-[260px]" href={process.env.NEXT_PUBLIC_API_BASE + "/oauth2/authorization/google"}>
            <Image className="w-full hover:opacity-90 transition-opacity rounded-full" src="/images/signup-google-rd.png" width={260} height={52} alt="sign up" />
          </Link>
        </div>
        <div className="flex gap-5 text-xs">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">이용약관</Link>
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">개인정보처리방침</Link>
        </div>
      </div>
    </div>
  );
}
