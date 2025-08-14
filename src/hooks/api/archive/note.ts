import { ArchiveType, BlockType } from "@/common/types";
import {
  createInfiniteGetQueryWithParams,
  createGetQuery,
} from "@/lib/reactQuery";

type NoteParams = {
  search?: string;
  tag?: string;
  sort?: string;
  order?: "asc" | "desc";
};

export type NoteSummaryResponse = {
  id: string;
  title: string;
  thumbnailPath: string;
  type: ArchiveType;
  summary: string;
  writer: {
    id: string;
    nickname: string;
    profileImagePath: string;
  };
};

export const listNotesKey = "listNote";
export const useListNotesQuery = createInfiniteGetQueryWithParams<
  NoteSummaryResponse,
  NoteParams
>("api/archive/notes", listNotesKey);

type BlockResponse = {
  id: string;
  type: BlockType;
  position: number;
  payload: string;
};

type NoteDetailResponse = {
  meta: NoteSummaryResponse;
  tags: string[];
  blocks: BlockResponse[];
};
export const noteDetailKey = "listNote";

export const useNoteDetailQuery =
  createGetQuery<NoteDetailResponse>(listNotesKey);
