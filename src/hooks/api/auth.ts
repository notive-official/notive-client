import {
  createPostMutation,
  createGetQueryWithPredefinedUrl,
} from "@/lib/reactQuery";

export const usePostReissueMutation = createPostMutation<void, void>(
  "api/auth/reissue"
);

export const usePostLogoutMutation = createPostMutation<void, void>(
  "api/auth/logout"
);

export type GetUserResponse = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  serviceImageUrl: string;
};
export const useGetUserQuery = createGetQueryWithPredefinedUrl<GetUserResponse>(
  "api/user/header",
  "getUser"
);
