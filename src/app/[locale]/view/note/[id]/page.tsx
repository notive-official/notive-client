"use client";

import { use } from "react";
import { useNoteDetailQuery } from "@/hooks/api/archive/note";
import Viewer from "@/components/viewer/Viewer";
import { Button } from "@headlessui/react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";

type NoteeDetailProps = { id: string };

export default function NoteDetailPage({
  params,
}: {
  params: Promise<NoteeDetailProps>;
}) {
  const { id } = use(params);
  const { data } = useNoteDetailQuery(`api/archive/notes/${id}`, {
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="flex flex-col justify-start items-center w-full max-w-7xl p-16">
      {data && (
        <div>
          <div className="flex flex-row w-full justify-end">
            {data.canEdit && (
              <Button className="click-effect">
                <div className="px-4 py-2 rounded bg-reverse-5">
                  <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                </div>
              </Button>
            )}
          </div>
          <Viewer
            title={data.meta.title}
            thumbnailPath={data.meta.thumbnailPath}
            tags={data.tags}
            blocks={data.blocks}
          />
        </div>
      )}
    </div>
  );
}
