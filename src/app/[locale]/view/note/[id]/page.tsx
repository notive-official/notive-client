"use client";

import { use } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNoteDetailQuery } from "@/hooks/api/archive/note";
import Viewer from "@/components/viewer/Viewer";

type NoteeDetailProps = { id: string };

export default function NoteDetailPage({
  params,
}: {
  params: Promise<NoteeDetailProps>;
}) {
  const { id } = use(params);
  const { isAuthenticated } = useAuth();
  const { data } = useNoteDetailQuery(`api/archive/notes/${id}`, {
    enabled: isAuthenticated,
  });

  return (
    <div className="flex flex-col justify-start items-center w-full max-w-3xl py-16 overflow-y-auto">
      {data && (
        <Viewer title={data.meta.title} tags={data.tags} blocks={data.blocks} />
      )}
    </div>
  );
}
