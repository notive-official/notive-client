import { DEFAULT_ARCHIVE_THUMBNAIL_PATH, DEFAULT_GROUP_PLACEHOLDER } from "@/common/consts/defaultImage";
import { useRouter } from "@/i18n/routing";
import { Button } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ActionMenu from "../common/ActionMenu";
import { useModal } from "@/hooks/useModal";
import Modal from "../common/Modal";
import { DeleteGroup, ListGroupDetails, useDeleteGroupMutation } from "@/hooks/api/archive/group";
import { useQueryClient } from "@tanstack/react-query";
import { useErrorBar } from "@/contexts/ErrorBarContext";

interface GroupProps { id: string; thumbnails: Array<string | null>; name: string; totalElements: number; }

export default function GroupCard({ id, thumbnails, name, totalElements }: GroupProps) {
  const [first, second, third] = thumbnails.map((t) => t ?? DEFAULT_ARCHIVE_THUMBNAIL_PATH);
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
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ListGroupDetails.key() }),
      onError: () => pushError("해당 작업을 수행할 수 없습니다."),
    },
  });

  useEffect(() => {
    if (!menuOpen) return;
    const h = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [menuOpen]);

  return (
    <div className="relative group flex flex-col rounded-lg border border-border overflow-hidden cursor-pointer hover:border-ring transition-colors duration-200" onClick={() => router.push(`/archive/group/${id}`)}>
      <ActionMenu menuItems={[{ node: <span className="text-xs">Delete</span>, onClick: () => open() }]} />
      <Modal key="deleteGroupModal" title="Delete this group?" content="All posts in this group will be permanently deleted."
        actionNode={
          <div className="flex justify-end gap-2 pt-4">
            <Button className="px-3 py-1.5 text-xs font-medium rounded-md hover:bg-reverse-5 cursor-pointer transition-colors" onClick={() => close()}>Cancel</Button>
            <Button className="px-3 py-1.5 text-xs font-medium rounded-md bg-foreground text-surface hover:opacity-90 cursor-pointer transition-opacity" onClick={() => { deleteGroup(); close(); }}>Delete</Button>
          </div>
        }
        {...modalBind}
      />
      <div className="relative grid grid-rows-2 grid-cols-[2fr_1fr] gap-px w-full h-36 bg-border">
        {thumbnails.length === 0 && <div className="relative row-span-2 col-span-2 bg-muted"><Image src={DEFAULT_GROUP_PLACEHOLDER} alt={name} fill sizes="200px" className="object-cover" /></div>}
        {first && <div className={`relative row-span-2 bg-muted ${thumbnails.length === 1 && "col-span-2"}`}><Image src={first} alt={name} fill sizes="200px" className="object-cover" /></div>}
        {second && <div className={`relative bg-muted ${thumbnails.length === 2 && "row-span-2"}`}><Image src={second} alt={name} fill sizes="200px" className="object-cover" /></div>}
        {third && <div className="relative bg-muted"><Image src={third} alt={name} fill sizes="200px" className="object-cover" /></div>}
        {restSize > 0 && <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">+{restSize}</div>}
      </div>
      <div className="px-3 py-2.5 flex items-center justify-between">
        <span className="text-xs font-medium text-foreground">{name}</span>
        <span className="text-[10px] text-muted-foreground tabular-nums">{totalElements}</span>
      </div>
    </div>
  );
}
