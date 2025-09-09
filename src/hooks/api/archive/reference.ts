import { ArchiveType } from "@/common/types";
import {
  createGetQuery,
  createInfiniteGetQueryWithParams,
  createPostMutation,
} from "@/lib/reactQuery";

type PostReferenceRequest = {
  title: string;
  tags: string[];
  groupId: string;
  isPublic: boolean;
  type: ArchiveType;
  isDuplicable: boolean;
  url: string;
};
type PostReferenceResponse = {
  id: string;
};
export const PostReference = {
  url: () => `api/archive/reference`,
};
export const usePostReferenceMutation = createPostMutation<
  void,
  PostReferenceRequest,
  PostReferenceResponse
>();

type LinkParams = {
  search?: string;
  tag?: string;
  sort?: string;
  order?: "asc" | "desc";
};
export type LinkSummaryResponse = {
  id: string;
  title: string;
  thumbnailPath: string;
  tags: string[];
  isPublic: boolean;
  type: ArchiveType;
  isDuplicable: boolean;
  writer: {
    id: string;
    nickname: string;
    profileImagePath: string;
  };
};

export const listLinksKey = "listReferences";
export const useListLinksQuery = createInfiniteGetQueryWithParams<
  LinkSummaryResponse,
  LinkParams
>("api/archive/references", listLinksKey);
