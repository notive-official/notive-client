import {
  createDeleteMutation,
  createGetQuery,
  createInfiniteGetQueryWithParams,
  createPostMutation,
  createPutMutation,
} from "@/lib/reactQuery";
import { ListRes } from "../../../lib/type";
import { ArchiveType } from "@/common/types";

// 그룹 이름 리스트 조회
export type GroupResponse = {
  id: string;
  name: string;
};
export const ListGroups = {
  url: () => "api/group/names",
  key: () => ["listGroups"],
};
export const useListGroupsQuery = createGetQuery<
  void,
  ListRes<GroupResponse>
>();

// 그룹 메타 조회
export const getGroupMeta = {
  url: (groupId: string) => `api/group/metas/${groupId}`,
  key: (groupId: string) => [groupId, "getGroupMeta"],
};
export const useGetGroupMetaQuery = createGetQuery<void, GroupResponse>();

// 그룹 상세 조회
export type GroupDetailResponse = {
  id: string;
  name: string;
  thumbnails: Array<string | null>;
  totalElements: number;
};
export const ListGroupDetails = {
  url: () => "api/group/metas",
  key: () => ["listGroupDetails"],
};
export const useListGroupDetailsQuery = createInfiniteGetQueryWithParams<
  GroupDetailResponse,
  void
>();

// 그룹 생성
export type PostGroupRequest = {
  groupName: string;
};
export const PostGroup = {
  url: () => "api/group",
};
export const usePostGroupMutation = createPostMutation<
  void,
  PostGroupRequest,
  void
>();

// 그룹 수정
export type PutGroupRequest = {
  groupName: string;
};
export const PutGroup = {
  url: (groupId: string) => `api/group/${groupId}`,
};
export const usePutGroupMutation = createPutMutation<
  void,
  PutGroupRequest,
  void
>();

export type ArchiveSummaryResponse = {
  id: string;
  title: string;
  thumbnailPath: string | null;
  tags: string[];
  isPublic: boolean;
  type: ArchiveType;
  isDuplicable: boolean;
  summary: string;
  writer: {
    id: string;
    nickname: string;
    profileImagePath: string | null;
  };
};
export const ListArchivesByGroup = {
  url: (groupId: string) => `api/group/${groupId}/archives`,
  key: (groupId: string): string[] => [groupId, "listArchivesByGroup"],
};
export const useListArchivesByGroupQuery = createInfiniteGetQueryWithParams<
  ArchiveSummaryResponse,
  void
>();

export const DeleteGroup = {
  url: (groupId: string) => `api/group/${groupId}`,
};
export const useDeleteGroupMutation = createDeleteMutation<void, void>();
