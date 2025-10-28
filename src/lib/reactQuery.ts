import {
  QueryFunction,
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import api from "./api";
import { ErrorRes, SliceRes } from "@/lib/type";
import { AxiosError } from "axios";

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
      UseMutationOptions<TResponse, AxiosError<ErrorRes>, TRequest>,
      "mutationFn"
    >;
  };

  return ({ url, params, options }: Props) =>
    useMutation<TResponse, AxiosError<ErrorRes>, TRequest>({
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
      UseMutationOptions<TResponse, AxiosError<ErrorRes>, TRequest>,
      "mutationFn"
    >;
  };

  return ({ url, params, options }: Props) =>
    useMutation<TResponse, AxiosError<ErrorRes>, TRequest>({
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
      UseMutationOptions<TResponse, AxiosError<ErrorRes>, TResponse>,
      "mutationFn"
    >;
  };

  return ({ url, params, options }: Props) =>
    useMutation<TResponse, AxiosError<ErrorRes>, TResponse>({
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
      UseQueryOptions<TResponse, AxiosError<ErrorRes>, TResponse>,
      "queryKey" | "queryFn"
    >;
  };
  return ({ url, key, params, options }: Props) =>
    useQuery<TResponse, AxiosError<ErrorRes>, TResponse>({
      queryKey: key,
      queryFn: () => fetcher(url, params),
      ...options,
    });
}

type InfiniteQueryProp<TParams> = {
  pageParam: number;
  params?: Omit<TParams, "page">;
};

export function createInfiniteGetQueryWithParams<TResponse, TParams>() {
  const fetcher = async (url: string, pageParam: number, params?: TParams) => {
    const { data } = await api.get<SliceRes<TResponse>>(url, {
      params: {
        page: pageParam,
        ...params,
      },
    });
    return data;
  };

  type Props = {
    url: string;
    key: string[];
    params?: TParams;
    options?: Omit<
      QueryFunction<SliceRes<TResponse>, readonly unknown[], unknown>,
      "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
    >;
  };
  return ({ url, key, params, options }: Props) =>
    useInfiniteQuery({
      queryKey: key,
      initialPageParam: 0,
      queryFn: ({ pageParam }) => fetcher(url, pageParam, params),
      getNextPageParam: (lastPage: SliceRes<TResponse>) => {
        return lastPage.meta.hasNext ? lastPage.meta.page + 1 : undefined;
      },
      ...options,
    });
}
