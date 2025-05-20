import { TextType } from "@/common/types";
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
  links: ArchiveLinkRequest[];
  images: ArchiveImageRequest[];
  texts: ArchiveTextRequest[];
};

export type ArchiveLinkRequest = {
  sequence: number;
  urls: string[];
};

export type ArchiveImageRequest = {
  sequence: number;
  files: File[];
  description: string;
};

export type ArchiveTextRequest = {
  sequence: number;
  type: TextType;
  content: string;
};

export const usePostArchiveMutation = createPostMutation<
  PostArchiveRequest,
  void
>("api/archive");
