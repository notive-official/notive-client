import ImageView from "../viewer/ImageView";
import ToggleSwitch from "../common/ToggleSwitch";
import Combo from "../common/Combo";
import { Button } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import {
  listGroups,
  PostGroup,
  PostGroupRequest,
  useListGroupsQuery,
  usePostGroupMutation,
} from "@/hooks/api/archive/group";
import Modal from "../common/Modal";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useEditor } from "@/contexts/EditorContext";
import useTranslation from "@/hooks/useTranslation";
import ImageUploader from "../common/ImageUploader";
import { ComboSelection, useCombo } from "@/hooks/useCombo";
import { useModal } from "@/hooks/useModal";
import { useErrorBar } from "@/contexts/ErrorBarContext";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { ErrorRes } from "@/lib/type";

export default function ArchiveSetting() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const { mutate: postGroup } = usePostGroupMutation({ url: PostGroup.url() });
  const { isPublic, thumbnail, changeIsPublic, changeThumbnail, changeGroup } =
    useEditor();
  const { PostTrans } = useTranslation();
  const { open, close, modalBind } = useModal();
  const { pushWarning, pushSuccess, pushError } = useErrorBar();

  const { data } = useListGroupsQuery({
    url: listGroups.url(),
    key: listGroups.key(),
    options: {
      staleTime: 1000 * 60 * 5,
      enabled: isAuthenticated,
    },
  });

  const groups =
    data?.content.map((group) => {
      const selection: ComboSelection = { id: group.id, name: group.name };
      return selection;
    }) ?? [];

  const { selected, query, comboBind } = useCombo({ options: groups });

  useEffect(() => {
    changeGroup(selected);
  }, [selected, changeGroup]);

  const deleteFile = () => {
    changeThumbnail(null);
  };

  const addGroup = (groupName: string) => {
    const req: PostGroupRequest = { groupName };
    postGroup(req, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: listGroups.key() });
        pushSuccess(PostTrans("message.success.groupCreation"));
        close();
      },
      onError: (e) => {
        const err = e as AxiosError<ErrorRes>;
        if (err.response?.data.message)
          pushError(PostTrans(err.response.data.message));
        pushError(PostTrans("message.error.groupCreation"));
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 썸네일 선택 */}
      <section className="flex flex-col h-full md:gap-5">
        <div className="relative w-full aspect-video bg-transparent md:block">
          <ImageUploader
            button={
              <div className="w-full h-full rounded-xl overflow-hidden items-center justify-center">
                {thumbnail ? (
                  <ImageView filePath={URL.createObjectURL(thumbnail)} />
                ) : (
                  <div className="flex justify-center items-center w-full h-full cursor-pointer bg-reverse-25 text-white border-primary border-2 border-dashed ">
                    <p>{PostTrans("setting.thumbnail.placeholder")}</p>
                  </div>
                )}
              </div>
            }
            handleFileChange={(file) => changeThumbnail(file)}
          />
          {thumbnail && (
            <Button
              className="absolute -top-2 -right-2 flex justify-center items-center click-effect"
              onClick={deleteFile}
            >
              <div className="w-full h-full p-1 rounded-xl bg-reverse-75">
                <XMarkIcon className="w-5 h-5 text-white" />
              </div>
            </Button>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-2 w-full">
        {/* 공개 선택 */}
        <div className="flex flex-row items-center justify-between">
          <p className="text-md text-foreground p-2">{"Visibility"}</p>
          <div className="flex flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {isPublic ? "public" : "private"}
            </p>
            <ToggleSwitch enabled={isPublic} onChange={changeIsPublic} />
          </div>
        </div>

        {/* 그룹 선택 */}
        <div className="flex flex-row justify-between items-center w-full gap-2">
          <p className="w-1/4 text-md text-foreground p-2">Group</p>
          <div className="flex flex-row items-end gap-2">
            <Combo
              {...comboBind}
              buttons={[
                <Button
                  key={"groupAddButton"}
                  onClick={() => {
                    if (query.length === 0) {
                      pushWarning(PostTrans("message.warning.groupCreation"));
                      return;
                    }
                    open();
                  }}
                  className="group flex w-full cursor-pointer justify-center items-center gap-2 rounded-xl px-3 py-1.5 select-none click-effect bg-reverse-50"
                >
                  <div className="text-sm/6 text-surface">
                    {PostTrans("setting.group.create.button")}
                  </div>
                </Button>,
              ]}
            />
            <Modal
              key={"addGroupModal"}
              title={PostTrans("setting.group.create.title")}
              actionNode={
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-md w-full text-start p-4 rounded-lg">
                    {query}
                  </div>
                  <div className="flex flex-row w-full gap-8">
                    <Button
                      className="w-full p-2 bg-surface cursor-pointer rounded-xl text-foreground"
                      onClick={() => close()}
                    >
                      취소
                    </Button>
                    <Button
                      className="w-full p-2 bg-foreground cursor-pointer rounded-xl text-surface"
                      onClick={() => addGroup(query)}
                    >
                      확인
                    </Button>
                  </div>
                </div>
              }
              {...modalBind}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
