import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import api from "./api";

export function createPostMutation<TRequest, TResponse>(url: string) {
  const poster = async (body: TRequest): Promise<TResponse> => {
    const { data } = await api.post<TResponse>(url, body);
    return data;
  };
  return (
    options?: Omit<UseMutationOptions<TResponse, Error, TRequest>, "mutationFn">
  ) =>
    useMutation<TResponse, Error, TRequest>({
      mutationFn: poster as MutationFunction<TResponse, TRequest>,
      ...options,
    });
}

export function createGetQuery<TResponse>(url: string, queryKey: string) {
  const fetcher = async (): Promise<TResponse> => {
    const { data } = await api.get<TResponse>(url);
    return data;
  };
  return (
    options?: Omit<
      UseQueryOptions<TResponse, unknown, TResponse>,
      "queryKey" | "queryFn"
    >
  ) =>
    useQuery<TResponse, unknown, TResponse>({
      queryKey: [queryKey],
      queryFn: fetcher,
      ...options,
    });
}

export function createGetQueryWithParams<TResponse, TParams>(
  url: string,
  queryKey: string
) {
  const fetcher = async (params?: TParams): Promise<TResponse> => {
    const { data } = await api.get<TResponse>(url, { params });
    return data;
  };
  return (
    params: TParams,
    options?: Omit<
      UseQueryOptions<TResponse, unknown, TResponse>,
      "queryKey" | "queryFn"
    >
  ) =>
    useQuery<TResponse, unknown, TResponse>({
      queryKey: [queryKey, params],
      queryFn: () => fetcher(params),
      ...options,
    });
}
