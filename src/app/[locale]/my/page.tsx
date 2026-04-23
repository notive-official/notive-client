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
    <div className="h-full flex flex-col items-center justify-start pt-12 md:pt-20 px-4">
      <div className="w-full max-w-lg">
        {data && (
          <div className="rounded-2xl border border-border bg-surface p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Profile Image */}
              <div className="relative shrink-0">
                <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-border">
                  <Image
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : data.profileImagePath ?? DEFAULT_PROFILE_PATH
                    }
                    alt={"profile"}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <ImageUploader
                  button={
                    <div className="absolute bottom-0 right-0 cursor-pointer rounded-full p-1.5 bg-primary text-on-primary shadow-md hover:opacity-90 transition-opacity">
                      <PencilSquareIcon className="w-3.5 h-3.5" />
                    </div>
                  }
                  handleFileChange={(newFile) => setFile(newFile)}
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 w-full space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">{MyTrans("information.name")}</span>
                  <span className="text-sm font-medium">{data.name}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">{MyTrans("information.nickname")}</span>
                  <span className="text-sm font-medium">{data.nickname}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">{MyTrans("information.email")}</span>
                  <span className="text-sm font-medium">{data.email}</span>
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">{MyTrans("language")}</span>
              <DropDown
                node={<LanguageIcon className="size-4 text-muted-foreground hover:text-foreground transition-colors" />}
                items={languages}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
