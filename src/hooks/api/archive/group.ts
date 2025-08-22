import {
  createGetQuery,
  createInfiniteGetQueryWithParams,
  createPostMutation,
} from "@/lib/reactQuery";
import { ListRes } from "../../../lib/type";

// 그룹 이름 리스트 조회
export type GroupResponse = {
  id: string;
  name: string;
};
export const listGroups = {
  url: () => "api/group/names",
  key: () => ["listGroups"],
};
export const useListGroupsQuery = createGetQuery<
  void,
  ListRes<GroupResponse>
>();

// 그룹 상세 조회
type GroupDetailParams = {
  page?: number;
};
export type GroupDetailResponse = {
  id: string;
  name: string;
  thumbnails: string[];
  totalElements: number;
};
export const listGroupDetailsKey = "listGroupDetails";
export const useListGroupDetailsQuery = createInfiniteGetQueryWithParams<
  GroupDetailResponse,
  GroupDetailParams
>("api/group/metas", listGroupDetailsKey);

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
