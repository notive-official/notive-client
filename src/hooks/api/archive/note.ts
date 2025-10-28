import { ArchiveType } from "@/common/types";
import { isImageBlock, isLinkBlock, isTextBlock } from "@/common/utils";
import { EditorBlock } from "@/contexts/BlockEditorContext";
import api from "@/lib/api";

type CreateNoteProps = {
  blocks: EditorBlock[];
  title: string;
  tags: string[];
  groupId: string;
  isPublic: boolean;
  type: ArchiveType;
  isDuplicable: boolean;
  thumbnail: File | null;
};

export const usePostNote = () => {
  return {
    postNote: (data: CreateNoteProps) => {
      const form = generateNoteRequestForm(data);
      return api.post("/api/archive/note", form, {
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
  type,
  isDuplicable,
  thumbnail,
}: CreateNoteProps): FormData => {
  const form = new FormData();

  if (thumbnail) form.append("thumbnailImage", thumbnail);
  form.append("isPublic", String(isPublic));
  form.append("type", type.toUpperCase());
  form.append("isDuplicable", String(isDuplicable));
  form.append("groupId", String(groupId));
  form.append("title", title);
  tags.forEach((t, i) => form.append(`tags[${i}]`, t));

  blocks.forEach((block, idx) => {
    appendIfImageBlock(form, { block, idx, position: idx });
    appendIfLinkBlock(form, { block, idx, position: idx });
    appendIfTextBlock(form, { block, idx, position: idx });
  });
  return form;
};

type UpdateNoteProps = {
  blocks: EditorBlock[];
  addedBlockIdxes: number[];
  updatedBlockIdxes: number[];
  reorderedBlockIdxes: number[];
  deletedBlockIds: string[];
  title?: string;
  tags?: string[];
  groupId?: string;
  isPublic?: boolean;
  type?: ArchiveType;
  isDuplicable?: boolean;
  thumbnail?: File | null;
};

export const usePatchNote = () => {
  return {
    patchNote: (archiveId: string, data: UpdateNoteProps) => {
      const form = generateNotePatchRequestForm(data);
      return api.patch(`/api/archive/note/${archiveId}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  };
};

export const generateNotePatchRequestForm = ({
  blocks,
  addedBlockIdxes,
  updatedBlockIdxes,
  reorderedBlockIdxes,
  deletedBlockIds,
  title,
  tags,
  groupId,
  isPublic,
  type,
  isDuplicable,
  thumbnail,
}: UpdateNoteProps): FormData => {
  const form = new FormData();

  if (thumbnail !== undefined && thumbnail !== null)
    form.append("thumbnailImage", thumbnail);
  if (isPublic !== undefined) form.append("isPublic", String(isPublic));
  if (type !== undefined) form.append("type", type.toUpperCase());
  if (isDuplicable !== undefined)
    form.append("isDuplicable", String(isDuplicable));
  if (groupId !== undefined) form.append("groupId", String(groupId));
  if (title !== undefined) form.append("title", title);
  if (tags !== undefined) tags.forEach((t, i) => form.append(`tags[${i}]`, t));

  addedBlockIdxes.forEach((position, idx) => {
    const blockInfo = {
      block: blocks[position],
      idx,
      position,
      name: "_addedBlocks",
    };
    appendIfImageBlock(form, blockInfo);
    appendIfLinkBlock(form, blockInfo);
    appendIfTextBlock(form, blockInfo);
  });

  updatedBlockIdxes.forEach((position, idx) => {
    const blockInfo = {
      block: blocks[position],
      idx,
      position,
      name: "_updatedBlocks",
    };
    appendIfImageBlock(form, blockInfo);
    appendIfLinkBlock(form, blockInfo);
    appendIfTextBlock(form, blockInfo);
  });

  reorderedBlockIdxes.forEach((idx, i) => {
    form.append(`_reorderedBlocks[${i}].id`, String(blocks[idx].id));
    form.append(`_reorderedBlocks[${i}].position`, String(idx));
  });

  deletedBlockIds.forEach((id, i) => {
    form.append(`_deletedBlocks[${i}]`, id);
  });
  return form;
};

type BlockInfo = {
  block: EditorBlock;
  idx: number;
  position: number;
  name?: string;
};

const appendIfImageBlock = (
  form: FormData,
  { block, idx, position, name = "_blocks" }: BlockInfo
) => {
  if (!isImageBlock(block.type)) {
    return;
  }
  form.append(`${name}[${idx}].id`, block.id);
  form.append(`${name}[${idx}].position`, String(position));
  form.append(`${name}[${idx}].type`, block.type.toUpperCase());
  form.append(`${name}[${idx}].file`, block.payload.file!);
};

const appendIfLinkBlock = (
  form: FormData,
  { block, idx, position, name = "_blocks" }: BlockInfo
) => {
  if (!isLinkBlock(block.type)) {
    return;
  }
  form.append(`${name}[${idx}].id`, block.id);
  form.append(`${name}[${idx}].position`, String(position));
  form.append(`${name}[${idx}].type`, block.type.toUpperCase());
  form.append(`${name}[${idx}].content`, block.payload.content);
};

const appendIfTextBlock = (
  form: FormData,
  { block, idx, position, name = "_blocks" }: BlockInfo
) => {
  if (!isTextBlock(block.type)) {
    return;
  }
  form.append(`${name}[${idx}].id`, block.id);
  form.append(`${name}[${idx}].position`, String(position));
  form.append(`${name}[${idx}].type`, block.type.toUpperCase());
  form.append(`${name}[${idx}].content`, block.payload.content);
};
