import {
  createGetQuery,
  createInfiniteGetQueryWithParams,
  createPostMutation,
} from "@/lib/reactQuery";
import { ListRes } from "../../../lib/type";

export type GroupResponse = {
  id: string;
  name: string;
};
export const listGroupsKey = "listGroups";
export const useListGroupsQuery = createGetQuery<ListRes<GroupResponse>>(
  "api/group/names",
  listGroupsKey
);

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

export type PostGroupRequest = {
  groupName: string;
};
export const usePostGroupMutation = createPostMutation<PostGroupRequest, void>(
  "api/group"
);
