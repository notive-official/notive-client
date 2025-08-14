"use client";

import { use } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNoteDetailQuery } from "@/hooks/api/archive/note";
import Viewer from "@/components/viewer/Viewer";

type ArchiveDetailProps = { id: string };

export default function ArchiveDetailPage({
  params,
}: {
  params: Promise<ArchiveDetailProps>;
}) {
  const { id } = use(params);
  const { isAuthenticated } = useAuth();
  const { data } = useNoteDetailQuery(`api/archive/notes/${id}`, {
    enabled: isAuthenticated,
  });

  return (
    <div className="flex flex-col justify-center w-full max-w-3xl">
      {data && (
        <Viewer title={data.meta.title} tags={data.tags} blocks={data.blocks} />
      )}
    </div>
  );
}
