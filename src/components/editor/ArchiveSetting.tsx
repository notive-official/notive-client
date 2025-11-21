import ImageView from "../viewer/ImageView";
import ToggleSwitch from "../common/ToggleSwitch";
import Combo from "../common/Combo";
import { Button } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import {
  ListGroups,
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
import ThumbnailView from "../viewer/ThumbnailView";
import { DEFAULT_ARCHIVE_THUMBNAIL_PATH } from "@/common/consts/defaultImage";

interface ArchiveSettingProps {
  thumnailUpload?: boolean;
}

export default function ArchiveSetting({
  thumnailUpload = true,
}: ArchiveSettingProps) {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const { mutate: postGroup } = usePostGroupMutation({ url: PostGroup.url() });
  const { state, setState } = useEditor();
  const { PostTrans } = useTranslation();
  const { open, close, modalBind } = useModal();
  const { pushWarning, pushSuccess, pushError } = useErrorBar();

  const { data } = useListGroupsQuery({
    url: ListGroups.url(),
    key: ListGroups.key(),
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

  const { selected, query, comboBind } = useCombo({
    options: groups,
    selected: state.group,
    query: state.group?.name,
  });

  useEffect(() => {
    setState({ ...state, group: selected });
  }, [selected]);

  const changeThumbnail = (newThumbnail: File) => {
    setState({
      ...state,
      thumbnail: {
        path: URL.createObjectURL(newThumbnail),
        file: newThumbnail,
      },
    });
  };

  const deleteThumbnail = () => {
    setState({ ...state, thumbnail: null });
  };

  const changePublic = (isPublic: boolean) => {
    setState({ ...state, isPublic });
  };

  const changeDuplicable = (isDuplicable: boolean) => {
    setState({ ...state, isDuplicable });
  };

  const addGroup = (groupName: string) => {
    const req: PostGroupRequest = { groupName };
    postGroup(req, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ListGroups.key() });
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
      {thumnailUpload ? (
        <section className="flex flex-col h-full md:gap-5">
          <div className="relative w-full aspect-video bg-transparent md:block">
            <ImageUploader
              button={
                <div className="w-full h-full rounded-xl overflow-hidden items-center justify-center">
                  {state.thumbnail ? (
                    <ImageView filePath={state.thumbnail.path} />
                  ) : (
                    <div className="flex justify-center items-center w-full h-full cursor-pointer bg-muted text-muted-foreground border-reverse-25 border-3 border-dashed">
                      <p>{PostTrans("setting.thumbnail.placeholder")}</p>
                    </div>
                  )}
                </div>
              }
              handleFileChange={(file) => changeThumbnail(file)}
            />
            {state.thumbnail && (
              <Button
                className="absolute -top-2 -right-2 flex justify-center items-center click-effect"
                onClick={deleteThumbnail}
              >
                <div className="w-full h-full p-1 rounded-xl bg-reverse-75">
                  <XMarkIcon className="w-5 h-5 text-white" />
                </div>
              </Button>
            )}
          </div>
        </section>
      ) : (
        <ThumbnailView
          thumbnailPath={
            state.thumbnail?.path ?? DEFAULT_ARCHIVE_THUMBNAIL_PATH
          }
          referenceUrl={state.url}
        />
      )}

      <section className="flex flex-col gap-2 w-full">
        {/* 공개 선택 */}
        <div className="flex flex-col p-2 gap-1">
          <div className="flex flex-row items-center justify-between">
            <p className="text-lg text-foreground font-medium">
              {PostTrans("setting.access.name")}
            </p>
            <div className="flex flex-row justify-end items-center gap-4">
              <p className="text-md text-muted-foreground">
                {state.isPublic ? "public" : "private"}
              </p>
              <ToggleSwitch enabled={state.isPublic} onChange={changePublic} />
            </div>
          </div>
          <div className="text-sm text-reverse-50">
            {PostTrans("setting.access.description")}
          </div>
        </div>

        {/* 복제 선택 */}
        <div className="flex flex-col p-2 gap-1">
          <div className="flex flex-row items-center justify-between">
            <p className="text-lg text-foreground font-medium">
              {PostTrans("setting.copy.name")}
            </p>
            <div className="flex flex-row justify-between items-center gap-4">
              <p className="text-md text-muted-foreground">
                {state.isDuplicable ? "allowed" : "denied"}
              </p>
              <ToggleSwitch
                enabled={state.isDuplicable}
                onChange={changeDuplicable}
              />
            </div>
          </div>
          <div className="text-sm text-reverse-50">
            {PostTrans("setting.copy.description")}
          </div>
        </div>

        {/* 그룹 선택 */}
        <div className="flex flex-col justify-center items-start w-full p-2 gap-1">
          <p className="text-md text-foreground">Group</p>
          <div className="flex flex-row w-full items-end gap-2">
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
                  className="group flex w-full cursor-pointer justify-center items-center gap-2 rounded-xl select-none click-effect"
                >
                  <div className="text-sm/6 font-semibold text-foreground bg-reverse-10 w-full px-3 py-1.5 rounded-xl">
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
