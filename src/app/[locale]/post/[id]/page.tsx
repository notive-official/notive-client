"use client";

import { use } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArchiveDetail,
  useArchiveDetailQuery,
} from "@/hooks/api/archive/archive";
import Viewer from "@/components/viewer/Viewer";

type ArchiveDetailProps = { id: string };

export default function ArchiveDetailPage({
  params,
}: {
  params: Promise<ArchiveDetailProps>;
}) {
  const { id } = use(params);
  const { isLoading } = useAuth();
  const { data } = useArchiveDetailQuery({
    url: ArchiveDetail.url(id),
    key: ArchiveDetail.key(id),
    options: {
      enabled: !isLoading,
    },
  });

  return (
    <div className="flex flex-col justify-center items-center w-full h-full py-4 lg:p-16">
      {data && (
        <Viewer
          id={data.meta.id}
          title={data.meta.title}
          type={data.meta.type}
          thumbnailPath={data.meta.thumbnailPath}
          canEdit={data.canEdit}
          hasMarked={data.isMarked}
          canDuplicate={data.canDuplicate}
          canDelete={data.canDelete}
          tags={data.tags}
          blocks={data.blocks}
        />
      )}
    </div>
  );
}
