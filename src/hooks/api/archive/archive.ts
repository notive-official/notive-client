import { ArchiveType, BlockType } from "@/common/types";
import {
  createDeleteMutation,
  createGetQuery,
  createInfiniteGetQueryWithParams,
} from "@/lib/reactQuery";

type ListArchivesParams = {
  type?: ArchiveType;
};
export type ArchiveSummaryResponse = {
  id: string;
  title: string;
  thumbnailPath: string | null;
  tags: string[];
  isPublic: boolean;
  type: ArchiveType;
  summary: string;
  writer: {
    id: string;
    nickname: string;
    profileImagePath: string | null;
  };
};
export const ListArchives = {
  url: () => "api/archive",
  key: () => ["listArchive"],
};
export const useListArchivesQuery = createInfiniteGetQueryWithParams<
  ArchiveSummaryResponse,
  ListArchivesParams
>();

export const ListBookmarkArchives = {
  url: () => "api/archive/bookmarks",
  key: () => ["listBookmarkArchive"],
};
export const useListBookmarkArchivesQuery = createInfiniteGetQueryWithParams<
  ArchiveSummaryResponse,
  ListArchivesParams
>();

export type ArchiveMetaResponse = {
  id: string;
  title: string;
  thumbnailPath: string | null;
  isPublic: boolean;
  type: ArchiveType;
  isDuplicable: boolean;
  group: {
    id: string;
    name: string;
  };
  writer: {
    id: string;
    nickname: string;
    profileImagePath: string | null;
  };
};
type BlockResponse = {
  id: string;
  type: BlockType;
  position: number;
  payload: string;
};
export type ArchiveDetailResponse = {
  meta: ArchiveMetaResponse;
  canEdit: boolean;
  canDelete: boolean;
  canDuplicate: boolean;
  isMarked: boolean;
  tags: string[];
  blocks: BlockResponse[];
};
export const ArchiveDetail = {
  url: (archiveId: string) => `api/archive/${archiveId}`,
  key: (archiveId: string) => [archiveId, "archiveDetail"],
};
export const useArchiveDetailQuery = createGetQuery<
  void,
  ArchiveDetailResponse
>();

export const DeleteArchive = {
  url: (archiveId: string) => `api/archive/${archiveId}`,
};
export const useDeleteArchiveMutation = createDeleteMutation<void, void>();
