import {
  DEFAULT_ARCHIVE_THUMBNAIL_PATH,
  DEFAULT_GROUP_PLACEHOLDER,
} from "@/common/consts/defaultImage";
import { useRouter } from "@/i18n/routing";
import { Button } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ActionMenu from "../common/ActionMenu";
import { useModal } from "@/hooks/useModal";
import Modal from "../common/Modal";
import {
  DeleteGroup,
  ListGroupDetails,
  useDeleteGroupMutation,
} from "@/hooks/api/archive/group";
import { useQueryClient } from "@tanstack/react-query";
import { useErrorBar } from "@/contexts/ErrorBarContext";

interface GroupProps {
  id: string;
  thumbnails: Array<string | null>;
  name: string;
  totalElements: number;
}

export default function GroupCard({
  id,
  thumbnails,
  name,
  totalElements,
}: GroupProps) {
  const [first, second, third] = thumbnails.map(
    (t) => t ?? DEFAULT_ARCHIVE_THUMBNAIL_PATH
  );
  const restSize = totalElements - 3;
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const queryClient = useQueryClient();
  const { open, close, modalBind } = useModal();
  const { pushError } = useErrorBar();
  const { mutate: deleteGroup } = useDeleteGroupMutation({
    url: DeleteGroup.url(id),
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ListGroupDetails.key() });
      },
      onError: (err) => {
        pushError("해당 작업을 수행할 수 없습니다.");
      },
    },
  });

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const handleClick = () => {
    router.push(`/archive/group/${id}`);
  };

  return (
    <div
      className="relative group flex flex-col max-w-84 w-full rounded-xl p-2 shadow-md click-effect"
      onClick={() => handleClick()}
    >
      <ActionMenu
        menuItems={[
          {
            node: <div className="h-full w-full">삭제</div>,
            onClick: () => open(),
          },
        ]}
      />
      <Modal
        key={"deleteGroupModal"}
        title="정말로 삭제하시겠습니까?"
        content="그룹 삭제 시 그룹에 속한 모든 게시물이 삭제됩니다."
        actionNode={
          <div className="flex flex-row w-full justify-center items-center gap-4 pt-8">
            <Button className="p-2 click-effect w-20" onClick={() => close()}>
              취소
            </Button>
            <Button
              className="p-2 click-effect w-20"
              onClick={() => {
                deleteGroup();
                close();
              }}
            >
              확인
            </Button>
          </div>
        }
        {...modalBind}
      />
      <div className="flex flex-col gap-2">
        <div className="relative grid grid-rows-2 grid-cols-[2fr_1fr] gap-1 w-full h-48 rounded-lg">
          {thumbnails.length === 0 && (
            <div className="relative row-span-2 col-span-2">
              <Image
                src={DEFAULT_GROUP_PLACEHOLDER}
                alt={`${name} preview`}
                fill
                sizes="200px"
                className="rounded object-cover"
              />
            </div>
          )}
          {/* big left image, spans both rows */}
          {first && (
            <div
              className={`relative row-span-2 ${
                thumbnails.length === 1 && "col-span-2"
              }`}
            >
              <Image
                src={first}
                alt={`${name} preview`}
                fill
                sizes="200px"
                className="rounded object-cover"
              />
            </div>
          )}

          {/* top‑right */}
          {second && (
            <div
              className={`relative ${thumbnails.length === 2 && "row-span-2"}`}
            >
              <Image
                src={second}
                alt={`${name} preview`}
                fill
                sizes="200px"
                className="rounded object-cover"
              />
            </div>
          )}

          {/* bottom‑right */}
          {third && (
            <div className="relative">
              <Image
                src={third}
                alt={`${name} preview`}
                fill
                sizes="200px"
                className="rounded object-cover"
              />
            </div>
          )}

          {/* if you have more than 3, overlay a “+N” badge */}
          {restSize > 0 && (
            <div
              className="
              absolute bottom-2 right-2
              bg-black bg-opacity-50 text-white text-sm
              px-2 py-1 rounded
            "
            >
              +{restSize}
            </div>
          )}
        </div>
      </div>
      <p className="w-full text-center text-foreground text-md">{name}</p>
    </div>
  );
}
