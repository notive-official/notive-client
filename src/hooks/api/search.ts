import { createGetQueryWithParams } from "@/lib/reactQuery";
import { SliceRes } from "./type";

type ArchiveParams = {
  page: number;
};
export type ArchiveResponse = {
  id: string;
  title: string;
  thumbnailPath: string;
  writer: {
    id: string;
    nickname: string;
    profileImagePath: string;
  };
};
export const listArchivesKey = "listArchive";
export const useListArchivesQuery = createGetQueryWithParams<
  SliceRes<ArchiveResponse>,
  ArchiveParams
>("api/search", listArchivesKey);
