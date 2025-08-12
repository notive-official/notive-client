"use client";

import TagSearchBar from "@/components/archive/TagSearchBar";
import NoteCard from "@/components/archive/NoteCard";
import { useAuth } from "@/contexts/AuthContext";
import { useListNotesQuery } from "@/hooks/api/archive/note";

export default function NotePage() {
  const { isAuthenticated } = useAuth();
  const page = 0;
  const { data } = useListNotesQuery(
    { page },
    {
      enabled: isAuthenticated,
    }
  );
  return (
    <div className="relative h-full w-full flex flex-row justify-start mx-auto overflow-y-auto p-8">
      <section className="flex flex-row justify-between items-start h-full w-full max-w-7xl">
        <div className="flex flex-col gap-20 w-full pb-32">
          <TagSearchBar />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {data?.content.map((note) => {
              return (
                <div className="flex justify-center" key={note.id}>
                  <NoteCard
                    key={note.id}
                    title={note.title}
                    thumbnailUrl={note.thumbnailPath}
                    name={note.writer.nickname}
                    content={""}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4"></section>
    </div>
  );
}
