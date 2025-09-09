import { createPostMutation, createDeleteMutation } from "@/lib/reactQuery";

export const PostBookmark = {
  url: (archiveId: string) => `api/archive/${archiveId}/bookmark`,
};
export const usePostBookmarkMutation = createPostMutation<void, void, void>();

export const DeleteBookmark = {
  url: (archiveId: string) => `api/archive/${archiveId}/bookmark`,
};
export const useDeleteBookmarkMutation = createDeleteMutation<void, void>();
