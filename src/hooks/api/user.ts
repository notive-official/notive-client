import {
  createPostMutation,
  createGetQueryWithPredefinedUrl,
  createPutMutation,
} from "@/lib/reactQuery";

export const usePostReissueMutation = createPostMutation<void, void>(
  "api/auth/reissue"
);

export const usePostLogoutMutation = createPostMutation<void, void>(
  "api/auth/logout"
);

export type PutProfileImageRequest = {
  file: File;
};
export const usePutProfileImageMutation = createPutMutation<
  PutProfileImageRequest,
  void
>("api/user/profile/image");

export type GetUserResponse = {
  nickname: string;
  profileImagePath: string;
};
export const useGetUserQuery = createGetQueryWithPredefinedUrl<GetUserResponse>(
  "api/user/header",
  "getUserHeader"
);

export type GetUserProfileResponse = {
  name: string;
  nickname: string;
  email: string;
  profileImagePath: string;
};
export const getUserProfileKey = "getUserProfile";
export const useGetUserProfileQuery =
  createGetQueryWithPredefinedUrl<GetUserProfileResponse>(
    "api/user/profile",
    getUserProfileKey
  );
