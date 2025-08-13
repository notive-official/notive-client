import { createInfiniteGetQueryWithParams } from "@/lib/reactQuery";

type NoteParams = {
  search?: string;
  tag?: string;
  sort?: string;
  order?: "asc" | "desc";
};

export type NoteResponse = {
  id: string;
  title: string;
  thumbnailPath: string;
  writer: {
    id: string;
    nickname: string;
    profileImagePath: string;
  };
};

export const listNotesKey = "listNote";
export const useListNotesQuery = createInfiniteGetQueryWithParams<
  NoteResponse,
  NoteParams
>("api/archive/notes", listNotesKey);
