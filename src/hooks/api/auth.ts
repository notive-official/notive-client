import { createPostMutation, createGetQuery } from "@/lib/reactQuery";

export type GetUserResponse = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  serviceImageUrl: string;
};
export const useGetUserQuery = createGetQuery<GetUserResponse>(
  "api/user/header",
  "getUser"
);
