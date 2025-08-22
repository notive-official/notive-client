"use client";

import { use } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { NoteDetail, useNoteDetailQuery } from "@/hooks/api/archive/note";
import Viewer from "@/components/viewer/Viewer";

type ArchiveDetailProps = { id: string };

export default function ArchiveDetailPage({
  params,
}: {
  params: Promise<ArchiveDetailProps>;
}) {
  const { id } = use(params);
  const { isLoading } = useAuth();
  const { data } = useNoteDetailQuery({
    url: NoteDetail.url(id),
    key: NoteDetail.key(id),
    options: {
      enabled: !isLoading,
    },
  });

  return (
    <div className="flex flex-col justify-start items-center w-full max-w-6xl p-16">
      {data && (
        <Viewer
          id={data.meta.id}
          title={data.meta.title}
          thumbnailPath={data.meta.thumbnailPath}
          canEdit={data.canEdit}
          hasMarked={data.isMarked}
          isReplicable={data.meta.isReplicable}
          tags={data.tags}
          blocks={data.blocks}
        />
      )}
    </div>
  );
}
