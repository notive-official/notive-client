import { createInfiniteGetQueryWithParams } from "@/lib/reactQuery";

type SearchParams = {
  tags?: string[];
};
export type SearchResponse = {
  id: string;
  title: string;
  thumbnailPath: string | null;
  summary: string;
  writer: {
    id: string;
    nickname: string;
    profileImagePath: string | null;
  };
};
export const Search = {
  url: () => "api/search",
  key: () => ["search"],
};
export const useSearchQuery = createInfiniteGetQueryWithParams<
  SearchResponse,
  SearchParams
>();
