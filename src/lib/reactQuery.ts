import {
  QueryFunction,
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import api from "./api";
import { SliceRes } from "@/lib/type";

export function createPostMutation<TParams, TRequest, TResponse>() {
  const poster = async (
    url: string,
    params?: TParams,
    body?: TRequest
  ): Promise<TResponse> => {
    const { data } = await api.post<TResponse>(url, body, { params });
    return data;
  };

  type Props = {
    url: string;
    params?: TParams;
    options?: Omit<
      UseMutationOptions<TResponse, Error, TRequest>,
      "mutationFn"
    >;
  };

  return ({ url, params, options }: Props) =>
    useMutation<TResponse, Error, TRequest>({
      mutationFn: (variables: TRequest) => poster(url, params, variables),
      ...options,
    });
}

export function createPutMutation<TParams, TRequest, TResponse>() {
  const puter = async (
    url: string,
    params?: TParams,
    body?: TRequest
  ): Promise<TResponse> => {
    const { data } = await api.put<TResponse>(url, body, { params });
    return data;
  };

  type Props = {
    url: string;
    params?: TParams;
    options?: Omit<
      UseMutationOptions<TResponse, Error, TRequest>,
      "mutationFn"
    >;
  };

  return ({ url, params, options }: Props) =>
    useMutation<TResponse, Error, TRequest>({
      mutationFn: (variables: TRequest) => puter(url, params, variables),
      ...options,
    });
}

export function createDeleteMutation<TParams, TResponse>() {
  const deleter = async (url: string, params?: TParams): Promise<TResponse> => {
    const { data } = await api.delete<TResponse>(url, { params });
    return data;
  };

  type Props = {
    url: string;
    params?: TParams;
    options?: Omit<
      UseMutationOptions<TResponse, Error, TResponse>,
      "mutationFn"
    >;
  };

  return ({ url, params, options }: Props) =>
    useMutation<TResponse, Error, TResponse>({
      mutationFn: () => deleter(url, params),
      ...options,
    });
}

export function createGetQuery<TParams, TResponse>() {
  const fetcher = async (url: string, params?: TParams): Promise<TResponse> => {
    const { data } = await api.get<TResponse>(url, { params });
    return data;
  };

  type Props = {
    url: string;
    key: string[];
    params?: TParams;
    options?: Omit<
      UseQueryOptions<TResponse, unknown, TResponse>,
      "queryKey" | "queryFn"
    >;
  };
  return ({ url, key, params, options }: Props) =>
    useQuery<TResponse, unknown, TResponse>({
      queryKey: key,
      queryFn: () => fetcher(url, params),
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
