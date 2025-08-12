import {
  createGetQuery,
  createGetQueryWithParams,
  createPostMutation,
} from "@/lib/reactQuery";
import { ListRes, SliceRes } from "../type";

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
  page: number;
};
export type GroupDetailResponse = {
  id: string;
  name: string;
  thumbnails: string[];
  totalElements: number;
};
export const listGroupDetailsKey = "listGroupDetails";
export const useListGroupDetailsQuery = createGetQueryWithParams<
  SliceRes<GroupDetailResponse>,
  GroupDetailParams
>("api/group/metas", listGroupDetailsKey);

export type PostGroupRequest = {
  groupName: string;
};
export const usePostGroupMutation = createPostMutation<PostGroupRequest, void>(
  "api/group"
);
