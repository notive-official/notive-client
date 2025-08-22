"use client";

import BlockView from "./BlockView";
import Tag from "../common/Tag";
import { BlockType } from "@/common/types";
import ThumbnailView from "./ThumbnailView";
import { Button } from "@headlessui/react";
import { PencilIcon, DocumentArrowUpIcon } from "@heroicons/react/24/outline";
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
import { AxiosError } from "axios";
import { ErrorRes } from "@/lib/type";

interface ViewerProps {
  id: string;
  title: string;
  thumbnailPath: string;
  tags: string[];
  canEdit: boolean;
  hasMarked: boolean;
  isReplicable: boolean;
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
  isReplicable,
  hasMarked,
  tags,
  canEdit,
  blocks,
}: ViewerProps) {
  const [isMarked, setIsMarked] = useState(hasMarked);
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
      onError: (e) => {
        const err = e as AxiosError<ErrorRes>;
        if (err.response?.data.message) pushWarning(err.response.data.message);
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
      onError: (e) => {
        const err = e as AxiosError<ErrorRes>;
        if (err.response?.data.message) pushWarning(err.response.data.message);
        else pushError("해당 작업을 수행할 수 없습니다.");
      },
    },
  });

  const { ViewTrans } = useTranslation();
  return (
    <div className="flex flex-col lg:flex-row gap-16 w-full h-full overflow-y-auto lg:overflow-hidden p-4">
      <meta></meta>
      <div className="flex flex-col gap-5">
        <h1 className="text-foreground text-4xl font-extrabold whitespace-normal break-words">
          {title.length === 0 ? <br /> : title}
        </h1>
        <div className="flex flex-row flex-wrap gap-2">
          {tags.map((tag) => {
            return <Tag key={tag} value={tag} />;
          })}
        </div>
        <ThumbnailView thumbnailPath={thumbnailPath} />
        <div className="flex flex-row gap-2">
          {isReplicable && (
            <span
              title={ViewTrans("replicate")}
              className="cursor-pointer rounded-md bg-muted w-fit"
            >
              <Button className="rounded-md click-effect w-fit py-1 px-3 text-muted-foreground">
                <DocumentArrowUpIcon className="w-5 h-5" />
              </Button>
            </span>
          )}
          {canEdit && (
            <span
              title={ViewTrans("edit")}
              className="cursor-pointer rounded-md bg-muted w-fit"
            >
              <Button className="rounded-md click-effect w-fit py-1 px-3 text-muted-foreground">
                <PencilIcon className="w-5 h-5" />
              </Button>
            </span>
          )}

          <span
            title={ViewTrans("bookmark")}
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
        </div>
      </div>

      <div className="flex flex-col w-full gap-8 lg:p-8 lg:overflow-y-auto">
        <div className="flex flex-col gap-2">
          {blocks.map((block) => (
            <BlockView key={block.id} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}
