import ToggleSwitch from "../common/ToggleSwitch";
import Combo from "../common/Combo";
import { Button } from "@headlessui/react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/16/solid";
import {
  ListGroups,
  PostGroup,
  PostGroupRequest,
  useListGroupsQuery,
  usePostGroupMutation,
} from "@/hooks/api/archive/group";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useEditor } from "@/contexts/EditorContext";
import useTranslation from "@/hooks/useTranslation";
import ImageUploader from "../common/ImageUploader";
import { ComboSelection, useCombo } from "@/hooks/useCombo";
import { useErrorBar } from "@/contexts/ErrorBarContext";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { ErrorRes } from "@/lib/type";
import ThumbnailView from "../viewer/ThumbnailView";
import { DEFAULT_ARCHIVE_THUMBNAIL_PATH } from "@/common/consts/defaultImage";
import Image from "next/image";

interface ArchiveSettingProps {
  thumnailUpload?: boolean;
}

export default function ArchiveSetting({ thumnailUpload = true }: ArchiveSettingProps) {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const { mutate: postGroup } = usePostGroupMutation({ url: PostGroup.url() });
  const { state, setState } = useEditor();
  const { PostTrans } = useTranslation();
  const { pushWarning, pushSuccess, pushError } = useErrorBar();

  const { data } = useListGroupsQuery({
    url: ListGroups.url(), key: ListGroups.key(),
    options: { staleTime: 1000 * 60 * 5, enabled: isAuthenticated },
  });

  const groups = data?.content.map((g) => ({ id: g.id, name: g.name } as ComboSelection)) ?? [];
  const { selected, query, comboBind } = useCombo({ options: groups, selected: state.group, query: state.group?.name });

  useEffect(() => {
    setState({ ...state, group: selected });
  }, [selected]);

  const changeThumbnail = (file: File) => {
    setState({ ...state, thumbnail: { path: URL.createObjectURL(file), file } });
  };

  const addGroup = () => {
    if (query.length === 0) { pushWarning(PostTrans("message.warning.groupCreation")); return; }
    const req: PostGroupRequest = { groupName: query };
    postGroup(req, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ListGroups.key() });
        pushSuccess(PostTrans("message.success.groupCreation"));
      },
      onError: (e) => {
        const err = e as AxiosError<ErrorRes>;
        if (err.response?.data.message) pushError(PostTrans(err.response.data.message));
        else pushError(PostTrans("message.error.groupCreation"));
      },
    });
  };

  return (
    <div className="flex flex-col gap-5 mt-4">
      {/* Thumbnail */}
      {thumnailUpload ? (
        <div className="relative">
          <ImageUploader
            button={
              state.thumbnail ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted">
                  <Image src={state.thumbnail.path} alt="thumbnail" fill className="object-cover" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed border-border bg-muted/50 cursor-pointer hover:border-ring hover:bg-muted transition-all">
                  <span className="text-sm text-muted-foreground">{PostTrans("setting.thumbnail.placeholder")}</span>
                </div>
              )
            }
            handleFileChange={changeThumbnail}
          />
          {state.thumbnail && (
            <Button
              className="absolute -top-2 -right-2 p-1 rounded-full bg-foreground text-surface shadow-md hover:opacity-80 transition-opacity cursor-pointer"
              onClick={() => setState({ ...state, thumbnail: null })}
            >
              <XMarkIcon className="w-4 h-4" />
            </Button>
          )}
        </div>
      ) : (
        <ThumbnailView thumbnailPath={state.thumbnail?.path ?? DEFAULT_ARCHIVE_THUMBNAIL_PATH} referenceUrl={state.url} />
      )}

      {/* Settings row - Group + Toggles */}
      <div className="flex flex-col gap-4">
        {/* Group selection - inline creation */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Group</label>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Combo
                {...comboBind}
                buttons={[
                  <Button
                    key="groupAdd"
                    onClick={addGroup}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-reverse-5 cursor-pointer transition-colors"
                  >
                    <PlusIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Create &ldquo;{query}&rdquo;</span>
                  </Button>,
                ]}
              />
            </div>
          </div>
        </div>

        {/* Toggle row */}
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-secondary">{PostTrans("setting.access.name")}</span>
            <ToggleSwitch enabled={state.isPublic} onChange={(v) => setState({ ...state, isPublic: v })} />
            <span className="text-xs text-muted-foreground">{state.isPublic ? "Public" : "Private"}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-secondary">{PostTrans("setting.copy.name")}</span>
            <ToggleSwitch enabled={state.isDuplicable} onChange={(v) => setState({ ...state, isDuplicable: v })} />
            <span className="text-xs text-muted-foreground">{state.isDuplicable ? "Allowed" : "Denied"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
