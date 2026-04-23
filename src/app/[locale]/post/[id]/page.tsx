"use client";

import { use } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ArchiveDetail, useArchiveDetailQuery } from "@/hooks/api/archive/archive";
import Viewer from "@/components/viewer/Viewer";

export default function ArchiveDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { isLoading } = useAuth();
  const { data, isLoading: isDataLoading } = useArchiveDetailQuery({
    url: ArchiveDetail.url(id), key: ArchiveDetail.key(id), options: { enabled: !isLoading },
  });

  if (isDataLoading || !data) {
    return <div className="flex items-center justify-center w-full h-[60vh]"><div className="w-4 h-4 border-[1.5px] border-border border-t-secondary rounded-full animate-spin" /></div>;
  }

  return (
    <Viewer
      id={data.meta.id} title={data.meta.title} type={data.meta.type}
      thumbnailPath={data.meta.thumbnailPath} writer={data.meta.writer} group={data.meta.group}
      canEdit={data.canEdit} hasMarked={data.isMarked} canDuplicate={data.canDuplicate}
      canDelete={data.canDelete} tags={data.tags} blocks={data.blocks}
    />
  );
}
