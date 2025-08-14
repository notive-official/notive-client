import { createInfiniteGetQueryWithParams } from "@/lib/reactQuery";

type ArchiveParams = {
  tags?: string[];
};
export type ArchiveResponse = {
  id: string;
  title: string;
  thumbnailPath: string;
  summary: string;
  writer: {
    id: string;
    nickname: string;
    profileImagePath: string;
  };
};
export const listArchivesKey = "listArchive";

export const useListArchivesQuery = createInfiniteGetQueryWithParams<
  ArchiveResponse,
  ArchiveParams
>("api/search", listArchivesKey);
