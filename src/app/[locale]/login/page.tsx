"use client";

import { useAuth } from "@/contexts/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import useTrans from "@/hooks/translation";

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
    <div className="h-full flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl bg-transparent-reverse p-6 backdrop-blur-2xl">
        <div className="flex-row flex w-full justify-between">
          <h3 className="text-base/7 font-medium fg-principal">
            {LoginTrans("title")}
          </h3>
        </div>
        <p className="mt-2 text-sm/6 fg-assistant">{LoginTrans("content")}</p>
        <div className="mt-4 w-full flex justify-center">
          <Link
            className="flex justify-center"
            href={
              process.env.NEXT_PUBLIC_API_BASE + "/oauth2/authorization/google"
            }
          >
            <Image
              className="w-2/3"
              src="/images/googleSignIn.png"
              width={100}
              height={100}
              alt={"sign in"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
