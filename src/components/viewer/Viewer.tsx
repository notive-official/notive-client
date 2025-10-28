"use client";

import BlockView from "./BlockView";
import Tag from "../common/Tag";
import { ArchiveType, BlockType } from "@/common/types";
import ThumbnailView from "./ThumbnailView";
import { Button } from "@headlessui/react";
import {
  PencilIcon,
  DocumentArrowUpIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import useTranslation from "@/hooks/useTranslation";
import Bookmark from "../common/Bookmark";
import { useState } from "react";
import {
  DeleteBookmark,
  PostBookmark,
  useDeleteBookmarkMutation,
  usePostBookmarkMutation,
} from "@/hooks/api/archive/boomark";
import { useErrorBar } from "@/contexts/ErrorBarContext";
import { LinkDetailView } from "./LinkDetailView";
import { useRouter } from "@/i18n/routing";
import {
  ArchiveDetail,
  DeleteArchive,
  ListArchives,
  useDeleteArchiveMutation,
} from "@/hooks/api/archive/archive";
import { useQueryClient } from "@tanstack/react-query";
import { useModal } from "@/hooks/useModal";
import Modal from "../common/Modal";
import { DEFAULT_ARCHIVE_THUMBNAIL_PATH } from "@/common/consts/defaultImage";

interface ViewerProps {
  id: string;
  title: string;
  thumbnailPath: string | null;
  tags: string[];
  canEdit: boolean;
  canDelete: boolean;
  hasMarked: boolean;
  canDuplicate: boolean;
  type: ArchiveType;
  blocks: {
    id: string;
    type: BlockType;
    position: number;
    payload: string;
  }[];
}

export default function Viewer({
  id,
  title,
  thumbnailPath,
  canDuplicate,
  canDelete,
  hasMarked,
  type,
  tags,
  canEdit,
  blocks,
}: ViewerProps) {
  const [isMarked, setIsMarked] = useState(hasMarked);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { open, close, modalBind } = useModal();
  const { pushWarning, pushError } = useErrorBar();
  const toggleBookmark = () => {
    if (!isMarked) postBookmark();
    if (isMarked) deleteBookmark();
  };
  const { mutate: postBookmark } = usePostBookmarkMutation({
    url: PostBookmark.url(id),
    options: {
      onSuccess: () => {
        setIsMarked(true);
      },
      onError: (err) => {
        if (err.status === 401 || err.status === 403) router.push("/login");
        else pushError("해당 작업을 수행할 수 없습니다.");
      },
    },
  });

  const { mutate: deleteBookmark } = useDeleteBookmarkMutation({
    url: DeleteBookmark.url(id),
    options: {
      onSuccess: () => {
        setIsMarked(false);
      },
      onError: (err) => {
        if (err.status === 401 || err.status === 403) router.push("/login");
        else pushError("해당 작업을 수행할 수 없습니다.");
      },
    },
  });

  const { mutate: deleteArchive } = useDeleteArchiveMutation({
    url: DeleteArchive.url(id),
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ListArchives.key() });
        queryClient.invalidateQueries({ queryKey: ArchiveDetail.key(id) });
        router.back();
      },
      onError: (err) => {
        if (err.status === 401 || err.status === 403) router.push("/login");
        else pushError("해당 작업을 수행할 수 없습니다.");
      },
    },
  });

  const { ViewTrans } = useTranslation();
  return (
    <div className="flex flex-col lg:flex-row gap-16 w-full h-full overflow-y-auto p-4">
      <div className="flex flex-col gap-5">
        <h1 className="text-foreground text-4xl font-extrabold whitespace-normal break-words">
          {title.length === 0 ? <br /> : title}
        </h1>
        <div className="flex flex-row flex-wrap gap-2">
          {tags.map((tag) => {
            return <Tag key={tag} value={tag} />;
          })}
        </div>
        {type === "NOTE" && (
          <ThumbnailView
            thumbnailPath={thumbnailPath ?? DEFAULT_ARCHIVE_THUMBNAIL_PATH}
          />
        )}
        <div className="flex flex-row gap-2">
          {canDuplicate && (
            <span
              title={ViewTrans("duplicate.button")}
              className="cursor-pointer rounded-md bg-muted w-fit"
            >
              <Button className="rounded-md click-effect w-fit py-1 px-3 text-muted-foreground">
                <DocumentArrowUpIcon className="w-5 h-5" />
              </Button>
            </span>
          )}
          {canEdit && (
            <span
              title={ViewTrans("edit.button")}
              className="cursor-pointer rounded-md bg-muted w-fit"
              onClick={(e) => {
                router.push(`/post/${id}/edit`);
              }}
            >
              <Button className="rounded-md click-effect w-fit py-1 px-3 text-muted-foreground">
                <PencilIcon className="w-5 h-5" />
              </Button>
            </span>
          )}

          <span
            title={ViewTrans("bookmark.button")}
            className="cursor-pointer rounded-md bg-muted w-fit"
            onClick={(e) => {
              e.preventDefault();
              toggleBookmark();
            }}
          >
            <Button className="rounded-md click-effect w-fit py-1 px-3 text-muted-foreground">
              <Bookmark isMarked={isMarked} className="w-5 h-5" />
            </Button>
          </span>
          {canDelete && (
            <span
              title={ViewTrans("delete.button")}
              className="cursor-pointer rounded-md bg-muted w-fit"
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
            >
              <Button className="rounded-md click-effect w-fit py-1 px-3 text-muted-foreground">
                <TrashIcon className="w-5 h-5" />
              </Button>
            </span>
          )}
          <Modal
            key={"deleteArchivepModal"}
            title={ViewTrans("delete.modal.title")}
            actionNode={
              <div className="flex flex-row justify-center items-center gap-8">
                <Button
                  className="px-4 p-2 click-effect"
                  onClick={() => close()}
                >
                  {ViewTrans("delete.modal.no")}
                </Button>
                <Button
                  className="px-4 p-2 click-effect"
                  onClick={() => deleteArchive()}
                >
                  {ViewTrans("delete.modal.yes")}
                </Button>
              </div>
            }
            className="max-w-md gap-4"
            {...modalBind}
          />
        </div>
      </div>

      {type === "NOTE" && (
        <div className="flex flex-col w-full gap-8 lg:p-8 lg:overflow-y-auto">
          <div className="flex flex-col gap-2">
            {blocks?.map((block) => (
              <BlockView key={block.id} block={block} />
            ))}
          </div>
        </div>
      )}
      {type === "REFERENCE" && (
        <div className="flex flex-col w-full gap-8 lg:p-8 lg:overflow-y-auto">
          <div className="flex flex-col gap-2">
            <LinkDetailView url={blocks[0].payload} />
          </div>
        </div>
      )}
    </div>
  );
}
