import { createGetQuery } from "@/lib/reactQuery";

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
export const GetOEmbed = {
  url: () => "api/oembed",
  key: (oEmbedUrl: string) => [oEmbedUrl, "getOEmbed"],
};
export const useGetOEmbedQuery = createGetQuery<
  GetOEmbedParams,
  GetOEmbedResponse
>();
