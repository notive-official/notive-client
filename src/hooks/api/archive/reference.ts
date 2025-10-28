import { ArchiveType } from "@/common/types";
import { createPostMutation } from "@/lib/reactQuery";

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
