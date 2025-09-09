"use client";

import { use } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { NoteDetail, useNoteDetailQuery } from "@/hooks/api/archive/note";
import Viewer from "@/components/viewer/Viewer";

type NoteeDetailProps = { id: string };

export default function NoteDetailPage({
  params,
}: {
  params: Promise<NoteeDetailProps>;
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
    <div className="flex flex-col justify-start items-center w-full max-w-7xl py-12 lg:p-16">
      {data && (
        <Viewer
          id={data.meta.id}
          title={data.meta.title}
          type={data.meta.type}
          thumbnailPath={data.meta.thumbnailPath}
          tags={data.tags}
          hasMarked={data.isMarked}
          isDuplicable={data.meta.isDuplicable}
          canEdit={data.canEdit}
          blocks={data.blocks}
        />
      )}
    </div>
  );
}
