import {
  MutationFunction,
  QueryFunction,
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import api from "./api";
import { SliceRes } from "@/lib/type";

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

export function createPutMutation<TRequest, TResponse>(url: string) {
  const poster = async (body: TRequest): Promise<TResponse> => {
    const { data } = await api.put<TResponse>(url, body);
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

export function createGetQuery<TResponse>(queryKey: string) {
  const fetcher = async (url: string): Promise<TResponse> => {
    const { data } = await api.get<TResponse>(url);
    return data;
  };
  return (
    url: string,
    options?: Omit<
      UseQueryOptions<TResponse, unknown, TResponse>,
      "queryKey" | "queryFn"
    >
  ) =>
    useQuery<TResponse, unknown, TResponse>({
      queryKey: [url, queryKey],
      queryFn: () => fetcher(url),
      ...options,
    });
}

export function createGetQueryWithPredefinedUrl<TResponse>(
  url: string,
  queryKey: string
) {
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

type InfiniteQueryProp<TParams> = {
  pageParam: number;
  params?: Omit<TParams, "page">;
};

export function createInfiniteGetQueryWithParams<TResponse, TParams>(
  url: string,
  queryKey: string
) {
  const fetcher = async ({ pageParam, params }: InfiniteQueryProp<TParams>) => {
    const { data } = await api.get<SliceRes<TResponse>>(url, {
      params: {
        page: pageParam,
        ...params,
      },
    });
    return data;
  };
  return (
    params: TParams,
    options: Omit<
      QueryFunction<SliceRes<TResponse>, readonly unknown[], unknown>,
      "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
    >
  ) =>
    useInfiniteQuery({
      queryKey: [queryKey, params],
      initialPageParam: 0,
      queryFn: (params: InfiniteQueryProp<TParams>) => fetcher({ ...params }),
      getNextPageParam: (lastPage: SliceRes<TResponse>) => {
        return lastPage.meta.hasNext ? lastPage.meta.page + 1 : undefined;
      },
      ...options,
    });
}
