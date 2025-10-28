"use client";

import useTrans from "@/hooks/useTranslation";
import { usePathname, useRouter } from "@/i18n/routing";
import { LanguageIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import DropDown, { Item } from "@/components/common/DropDown";
import { Language } from "@/common/consts/language";
import {
  GetUserProfile,
  useGetUserProfileQuery,
  usePutProfileImage,
} from "@/hooks/api/user";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import ImageUploader from "@/components/common/ImageUploader";
import { useEffect, useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useErrorBar } from "@/contexts/ErrorBarContext";
import { DEFAULT_PROFILE_PATH } from "@/common/consts/defaultImage";

export default function MyPage() {
  useRequireAuth();

  const { MyTrans, LanguageSelectTrans } = useTrans();
  const { postNote } = usePutProfileImage();
  const pathname = usePathname();
  const router = useRouter();
  const { pushSuccess } = useErrorBar();
  const { isAuthenticated } = useAuth();
  const [file, setFile] = useState<File>();
  const { data } = useGetUserProfileQuery({
    url: GetUserProfile.url(),
    key: GetUserProfile.key(),
    options: {
      enabled: isAuthenticated,
    },
  });

  useEffect(() => {
    if (!file) return;
    postNote({ file }).then(() => {
      pushSuccess(MyTrans("message.success.profile.image"));
    });
  }, [file]);

  const languages = Object.values(Language).map(
    (languageType): Item => ({
      name: LanguageSelectTrans(languageType),
      handleClick: () => router.push(pathname, { locale: languageType }),
    })
  );

  return (
    <div className="h-full flex flex-col items-center justify-between p-8">
      <div className="w-full max-w-lg rounded-xl bg-surface p-6 shadow-md">
        {data && (
          <div className="flex flex-row">
            <div className="relative size-[120px]">
              <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden">
                <Image
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : data.profileImagePath ?? DEFAULT_PROFILE_PATH
                  }
                  alt={"profile"}
                  fill
                  sizes="100px"
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
