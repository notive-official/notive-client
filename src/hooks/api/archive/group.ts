import { createGetQuery, createPostMutation } from "@/lib/reactQuery";
import { ListRes } from "../type";

export type GroupResponse = {
  id: string;
  name: string;
};
export const useListGroupsQuery = createGetQuery<ListRes<GroupResponse>>(
  "api/archive/groups",
  "listGroups"
);

export type PostGroupRequest = {
  groupName: string;
};
export const usePostGroupMutation = createPostMutation<PostGroupRequest, void>(
  "api/archive/group"
);
