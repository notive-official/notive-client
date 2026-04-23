"use client";

import BlockView from "./BlockView";
import Tag from "../common/Tag";
import { ArchiveType, BlockType } from "@/common/types";
import { Button } from "@headlessui/react";
import { PencilIcon, DocumentDuplicateIcon, TrashIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import useTranslation from "@/hooks/useTranslation";
import Bookmark from "../common/Bookmark";
import { useState } from "react";
import { DeleteBookmark, PostBookmark, useDeleteBookmarkMutation, usePostBookmarkMutation } from "@/hooks/api/archive/boomark";
import { useErrorBar } from "@/contexts/ErrorBarContext";
import { LinkDetailView } from "./LinkDetailView";
import { useRouter } from "@/i18n/routing";
import { ArchiveDetail, DeleteArchive, useDeleteArchiveMutation } from "@/hooks/api/archive/archive";
import { useQueryClient } from "@tanstack/react-query";
import { useModal } from "@/hooks/useModal";
import Modal from "../common/Modal";
import { DEFAULT_ARCHIVE_THUMBNAIL_PATH, DEFAULT_PROFILE_PATH } from "@/common/consts/defaultImage";
import Image from "next/image";

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
  writer: { id: string; nickname: string; profileImagePath: string | null };
  group: { id: string; name: string };
  blocks: { id: string; type: BlockType; position: number; payload: string }[];
}

export default function Viewer({ id, title, thumbnailPath, canDuplicate, canDelete, hasMarked, type, tags, canEdit, blocks, writer, group }: ViewerProps) {
  const [isMarked, setIsMarked] = useState(hasMarked);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { open, close, modalBind } = useModal();
  const { pushError } = useErrorBar();
  const { ViewTrans } = useTranslation();

  const onAuthErr = (err: { status?: number }) => {
    if (err.status === 401 || err.status === 403) router.push("/login");
    else pushError("해당 작업을 수행할 수 없습니다.");
  };

  const { mutate: postBookmark } = usePostBookmarkMutation({ url: PostBookmark.url(id), options: { onSuccess: () => setIsMarked(true), onError: onAuthErr } });
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation({ url: DeleteBookmark.url(id), options: { onSuccess: () => setIsMarked(false), onError: onAuthErr } });
  const { mutate: deleteArchive } = useDeleteArchiveMutation({
    url: DeleteArchive.url(id),
    options: { onSuccess: () => { queryClient.invalidateQueries({ queryKey: ArchiveDetail.key(id) }); router.back(); }, onError: onAuthErr },
  });

  const thumb = thumbnailPath ?? DEFAULT_ARCHIVE_THUMBNAIL_PATH;

  return (
    <div className="flex flex-col w-full">
      {/* ── Hero with overlay ── */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-muted">
        <Image
          src={thumb} alt={title} fill priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content on hero */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
          {group?.name && (
            <button
              onClick={() => router.push(`/archive/group/${group.id}`)}
              className="text-xs font-medium text-white/70 uppercase tracking-widest hover:text-white transition-colors cursor-pointer mb-3 block"
            >
              {group.name}
            </button>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            {title || "Untitled"}
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <Image src={writer.profileImagePath ?? DEFAULT_PROFILE_PATH} alt={writer.nickname} width={32} height={32} className="rounded-full object-cover ring-2 ring-white/20" />
            <span className="text-sm font-medium text-white/90">{writer.nickname}</span>
          </div>
        </div>

        {/* Visit link button for REFERENCE */}
        {type === "REFERENCE" && blocks[0]?.payload && (
          <button
            onClick={() => window.open(blocks[0].payload, "_blank", "width=900,height=700,scrollbars=yes")}
            className="absolute top-5 right-5 flex items-center gap-2 bg-white/15 backdrop-blur-md text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-white/25 transition-colors cursor-pointer"
          >
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            Visit link
          </button>
        )}
      </div>

      {/* ── Body ── */}
      <div className="w-full max-w-3xl mx-auto px-5 md:px-8">
        {/* Tags + Actions bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 border-b border-border">
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => <Tag key={t} value={t} onClick={(v) => router.push({ pathname: "/search", query: { tags: v } })} />)}
            </div>
          ) : <div />}

          <div className="flex items-center gap-1">
            {canDuplicate && (
              <ActionBtn title={ViewTrans("duplicate.button")}>
                <DocumentDuplicateIcon className="w-5 h-5" />
              </ActionBtn>
            )}
            {canEdit && (
              <ActionBtn title={ViewTrans("edit.button")} onClick={() => router.push(`/post/${id}/edit/${type === "NOTE" ? "note" : "reference"}`)}>
                <PencilIcon className="w-5 h-5" />
              </ActionBtn>
            )}
            <ActionBtn title={ViewTrans("bookmark.button")} onClick={() => isMarked ? deleteBookmark() : postBookmark()}>
              <Bookmark isMarked={isMarked} className="w-5 h-5" />
            </ActionBtn>
            {canDelete && (
              <ActionBtn title={ViewTrans("delete.button")} onClick={() => open()}>
                <TrashIcon className="w-5 h-5" />
              </ActionBtn>
            )}
          </div>
        </div>

        {/* Content area */}
        <div className="py-10 pb-24">
          {type === "NOTE" && (
            <div className="flex flex-col">
              {blocks?.map((b) => <BlockView key={b.id} block={b} />)}
            </div>
          )}
          {type === "REFERENCE" && <LinkDetailView url={blocks[0].payload} />}
        </div>
      </div>

      {/* Delete modal */}
      <Modal key="deleteArchiveModal" title={ViewTrans("delete.modal.title")}
        actionNode={
          <div className="flex justify-end gap-3 pt-5">
            <Button className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-reverse-5 cursor-pointer transition-colors" onClick={() => close()}>
              {ViewTrans("delete.modal.no")}
            </Button>
            <Button className="px-4 py-2 text-sm font-medium rounded-lg bg-foreground text-surface hover:opacity-90 cursor-pointer transition-opacity" onClick={() => deleteArchive()}>
              {ViewTrans("delete.modal.yes")}
            </Button>
          </div>
        }
        className="max-w-sm" {...modalBind}
      />
    </div>
  );
}

function ActionBtn({ children, title, onClick }: { children: React.ReactNode; title?: string; onClick?: () => void }) {
  return (
    <button title={title} onClick={onClick} className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-reverse-5 transition-all duration-150 cursor-pointer">
      {children}
    </button>
  );
}
