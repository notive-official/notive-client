import { ArchiveType, BlockType } from "@/common/types";
import { isImageBlock, isLinkBlock } from "@/common/utils";
import { EditorBlock } from "@/contexts/BlockEditorContext";
import api from "@/lib/api";
import {
  createInfiniteGetQueryWithParams,
  createGetQuery,
} from "@/lib/reactQuery";

type NoteParams = {
  search?: string;
  tag?: string;
  sort?: string;
  order?: "asc" | "desc";
};

export type NoteSummaryResponse = {
  id: string;
  title: string;
  thumbnailPath: string;
  tags: string[];
  isPublic: boolean;
  type: ArchiveType;
  isReplicable: boolean;
  summary: string;
  writer: {
    id: string;
    nickname: string;
    profileImagePath: string;
  };
};

export const listNotesKey = "listNote";
export const useListNotesQuery = createInfiniteGetQueryWithParams<
  NoteSummaryResponse,
  NoteParams
>("api/archive/notes", listNotesKey);

type BlockResponse = {
  id: string;
  type: BlockType;
  position: number;
  payload: string;
};

type NoteDetailResponse = {
  meta: NoteSummaryResponse;
  canEdit: boolean;
  tags: string[];
  blocks: BlockResponse[];
};
export const noteDetailKey = "listNote";

export const useNoteDetailQuery =
  createGetQuery<NoteDetailResponse>(listNotesKey);

type CreateNoteProps = {
  blocks: EditorBlock[];
  title: string;
  tags: string[];
  groupId: number;
  isPublic: boolean;
  archiveType: ArchiveType;
  isReplicable: boolean;
  thumbnail: File | null;
};

export const usePostNote = () => {
  return {
    postNote: (data: CreateNoteProps) => {
      const form = generateNoteRequestForm(data);
      return api.post("/api/archive", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  };
};
const generateNoteRequestForm = ({
  blocks,
  title,
  tags,
  groupId,
  isPublic,
  archiveType,
  isReplicable,
  thumbnail,
}: CreateNoteProps): FormData => {
  const form = new FormData();

  if (thumbnail) form.append("thumbnailImage", thumbnail);
  form.append("isPublic", String(isPublic));
  form.append("type", archiveType.toUpperCase());
  form.append("isReplicable", String(isReplicable));
  form.append("groupId", String(groupId));
  form.append("title", title);
  tags.forEach((t, i) => form.append(`tags[${i}]`, t));

  blocks.forEach((b, idx) => {
    form.append(`blocks[${idx}].position`, String(idx));
    if (
      (isImageBlock(b.type) && !b.payload.file) ||
      (isLinkBlock(b.type) && b.payload.content.length < 1)
    ) {
      form.append(`blocks[${idx}].content`, "");
      form.append(`blocks[${idx}].type`, "paragraph".toUpperCase());
      return;
    }
    form.append(`blocks[${idx}].type`, b.type.toUpperCase());
    form.append(`blocks[${idx}].content`, b.payload.content);
    if (b.payload.file) form.append(`blocks[${idx}].image`, b.payload.file);
  });
  return form;
};
