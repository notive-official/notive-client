import api from "@/lib/api";
import {
  createGetQuery,
  createPutMutation,
  createPostMutation,
} from "@/lib/reactQuery";

export const PostReissue = {
  url: () => "api/auth/reissue",
};
export const usePostReissueMutation = createPostMutation<void, void, void>();

export const PostLogout = {
  url: () => "api/auth/logout",
};
export const usePostLogoutMutation = createPostMutation<void, void, void>();

// 사용자 기본 정보 조회
export type GetUserResponse = {
  nickname: string;
  profileImagePath: string;
};
export const GetUser = {
  url: () => "api/user/header",
  key: () => ["getUserHeader"],
};
export const useGetUserQuery = createGetQuery<void, GetUserResponse>();

// 사용자 프로필 정보 조회
export type GetUserProfileResponse = {
  name: string;
  nickname: string;
  email: string;
  profileImagePath: string;
};
export const GetUserProfile = {
  url: () => "api/user/profile",
  key: () => ["getUserProfile"],
};
export const useGetUserProfileQuery = createGetQuery<
  void,
  GetUserProfileResponse
>();

// 사용자 프로필 이미지 변경
type UpdateProfileImageProps = {
  file: File;
};
export const usePutProfileImage = () => {
  return {
    postNote: (data: UpdateProfileImageProps) => {
      const form = new FormData();
      form.append("file", data.file);
      return api.put("/api/user/profile/image", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  };
};
