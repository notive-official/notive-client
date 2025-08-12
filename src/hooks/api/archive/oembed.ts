import { createGetQueryWithParams } from "@/lib/reactQuery";

type GetOEmbedParams = {
  url: string;
};
type GetOEmbedResponse = {
  version: string;
  type: string;
  providerName: string;
  providerUrl: string;
  title: string;
  authorName: string;
  authorUrl: string;
  thumbnailUrl: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  html: string;
};
export const useGetOEmbedQuery = createGetQueryWithParams<
  GetOEmbedResponse,
  GetOEmbedParams
>("api/oembed", "getOEmbed");
