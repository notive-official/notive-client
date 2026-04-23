import { ArchiveType } from "@/common/types";
import { createInfiniteGetQueryWithParams } from "@/lib/reactQuery";

export type SearchReqParam = {
  q?: string;
  tags?: string;
};

export type SearchResponse = {
  id: string;
  title: string;
  thumbnailPath: string | null;
  summary: string;
  tags: string[];
  type: ArchiveType;
  isPublic: boolean;
  writer: {
    id: string;
    nickname: string;
    profileImagePath: string | null;
  };
};

export const Search = {
  url: () => "api/archive/search",
  key: ({ q, tags }: SearchReqParam) => [
    "search",
    ...([q].filter(Boolean) as string[]),
    ...(tags ?? []),
  ],
};
export const useSearchQuery = createInfiniteGetQueryWithParams<
  SearchResponse,
  SearchReqParam
>();
