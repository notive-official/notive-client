import { BlockType } from "@/common/types";
import { createGetQueryWithParams, createPostMutation } from "@/lib/reactQuery";

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
>("api/archive/oembed", "getOEmbed");

export type PostArchiveRequest = {
  title: string;
  tags: string[];
  blocks: ContentBlockRequest[];
};

export type ContentBlockRequest = {
  position: number;
  type: BlockType;
  payload?: string;
  file?: File;
};

export const usePostArchiveMutation = createPostMutation<
  PostArchiveRequest,
  void
>("api/archive");
