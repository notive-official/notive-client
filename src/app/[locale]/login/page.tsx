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

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex flex-col w-full justify-center items-center max-w-sm rounded-xl bg-reverse-5 gap-8 p-8 shadow-lg">
        <div className="flex flex-col w-full justify-center items-center gap-16">
          {/* 서비스 이름 */}
          <div className="flex flex-col w-full justify-center items-center gap-6">
            <div className="flex flex-row justify-center items-center gap-4 mt-4">
              <Image
                className="w-10 h-10"
                src="/icons/favicon-dark.ico"
                width={32}
                height={32}
                alt={"icon"}
              />
              <h3 className="text-4xl font-bold text-foreground">
                {LoginTrans("title")}
              </h3>
            </div>
            <div className="text-sm text-muted-foreground">
              {LoginTrans("content")}
            </div>
          </div>

          {/* 로그인 및 회원가입 버튼 */}
          <div className="flex flex-col justify-center items-center gap-6 w-2/3">
            <Link
              className="flex"
              href={
                process.env.NEXT_PUBLIC_API_BASE +
                "/oauth2/authorization/google"
              }
            >
              <Image
                className="w-full hover:drop-shadow-lg rounded-full shadow"
                src="/images/signin-google-rd.png"
                width={100}
                height={100}
                alt={"sign in"}
              />
            </Link>
            <div className="flex items-center w-full">
              <div className="flex-1 h-px bg-reverse-25"></div>
              <span className="px-4 text-sm text-gray-600">or</span>
              <div className="flex-1 h-px bg-reverse-25"></div>
            </div>
            <Link
              className="flex"
              href={
                process.env.NEXT_PUBLIC_API_BASE +
                "/oauth2/authorization/google"
              }
            >
              <Image
                className="w-full hover:drop-shadow-lg rounded-full shadow"
                src="/images/signup-google-rd.png"
                width={100}
                height={100}
                alt={"sign in"}
              />
            </Link>
          </div>
        </div>

        {/* 이용약관 및 개인정보처리방침 */}
        <div className="flex flex-row gap-4">
          <Link
            href={"/"}
            className="text-sm font-semibold text-muted-foreground"
          >
            {"이용약관"}
          </Link>
          <Link href={"/"} className="text-sm font-semibold text-foreground">
            {"개인정보처리방침"}
          </Link>
        </div>
      </div>
    </div>
  );
}
