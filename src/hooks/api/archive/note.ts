import { createGetQueryWithParams } from "@/lib/reactQuery";
import { SliceRes } from "../type";

type NoteParams = {
  page: number;
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
export const useListNotesQuery = createGetQueryWithParams<
  SliceRes<NoteResponse>,
  NoteParams
>("api/archive/notes", listNotesKey);
