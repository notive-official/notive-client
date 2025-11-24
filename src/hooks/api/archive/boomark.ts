import { createPostMutation, createDeleteMutation } from "@/lib/reactQuery";

export const PostBookmark = {
  url: (archiveId: string) => `api/bookmark/${archiveId}`,
};
export const usePostBookmarkMutation = createPostMutation<void, void, void>();

export const DeleteBookmark = {
  url: (archiveId: string) => `api/bookmark/${archiveId}`,
};
export const useDeleteBookmarkMutation = createDeleteMutation<void, void>();
