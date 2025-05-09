/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  UseQueryOptions<Awaited<ReturnType<T>>, unknown, Awaited<ReturnType<T>>>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>
> = Omit<
  UseMutationOptions<
    ApiFnReturnType<MutationFnType>,
    Error,
    Parameters<MutationFnType>[0]
  >,
  "mutationFn"
>;
