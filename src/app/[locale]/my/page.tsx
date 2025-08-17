"use client";

import useTrans from "@/hooks/useTranslation";
import { usePathname, useRouter } from "@/i18n/routing";
import { LanguageIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import DropDown, { Item } from "@/components/common/DropDown";
import { Language } from "@/common/consts/language";
import { useGetUserProfileQuery } from "@/hooks/api/user";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import ImageUploader from "@/components/common/ImageUploader";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function MyPage() {
  const { MyTrans, LanguageSelectTrans } = useTrans();

  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [file, setFile] = useState<File>();
  const { data } = useGetUserProfileQuery({
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    api.put("/api/user/profile/image", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }, [file]);

  useEffect(() => {
    if (isAuthenticated) return;
    router.replace("/login");
  }, [isAuthenticated]);

  const languages = Object.values(Language).map(
    (languageType): Item => ({
      name: LanguageSelectTrans(languageType),
      handleClick: () => router.push(pathname, { locale: languageType }),
    })
  );

  return (
    <div className="h-full flex flex-col items-center justify-between p-8">
      <div className="w-full max-w-lg rounded-xl bg-reverse-5 p-6 backdrop-blur-2xl">
        {data && (
          <div className="flex flex-row">
            <div className="relative size-[120px]">
              <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden">
                <Image
                  src={file ? URL.createObjectURL(file) : data.profileImagePath}
                  alt={"profile"}
                  fill
                  className="object-cover rounded-full overflow-hidden bg-white"
                />
              </div>
              <ImageUploader
                button={
                  <div className="absolute bottom-1 right-1 cursor-pointer rounded-full p-1 bg-primary">
                    <PencilSquareIcon className="w-5 h-5 text-foreground hover-bg-effect" />
                  </div>
                }
                handleFileChange={(newFile) => setFile(newFile)}
              />
            </div>
            <div className="w-full p-8">
              <div className="flex flex-row justify-between">
                <p className="font-bold">{MyTrans("information.name")}</p>
                <p>{data.name}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="font-bold">{MyTrans("information.nickname")}</p>
                <p>{data.nickname}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="font-bold">{MyTrans("information.email")}</p>
                <p>{data.email}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row items-center justify-end gap-2">
          <p>{MyTrans("language")}</p>
          <DropDown
            node={<LanguageIcon className="size-4" />}
            items={languages}
          />
        </div>
      </div>
    </div>
  );
}
