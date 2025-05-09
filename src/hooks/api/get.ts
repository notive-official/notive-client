import api from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationConfig, QueryConfig } from "@/lib/reactQuery";

export function createFetcher<TResponse>(url: string) {
  return async (): Promise<TResponse> => {
    const { data } = await api.get<TResponse>(url);
    return data;
  };
}

export function createPoster<TRequest, TResponse>(url: string) {
  return async (body: TRequest): Promise<TResponse> => {
    const { data } = await api.post<TResponse>(url, body);
    return data;
  };
}

const postLogout = createPoster<void, void>("api/auth/logout");
export const usePostLogoutMutation = (
  options?: MutationConfig<typeof postLogout>
) => {
  return useMutation({ mutationFn: postLogout, ...options });
};

export type GetUserResponse = {
  userId: number;
  nickname: string;
  roles: string[];
  profileImageUrl: string;
};

const getUser = createFetcher<GetUserResponse>("api/user/header");
export const useGetUserQuery = (options?: QueryConfig<typeof getUser>) => {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
    ...options,
  });
};
