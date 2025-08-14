import { BlockType } from "./types";

export const isTextBlock = (blockType: BlockType): boolean => {
  if (blockType === "H1") return true;
  if (blockType === "H2") return true;
  if (blockType === "H3") return true;
  if (blockType === "PARAGRAPH") return true;
  return false;
};

export const isImageBlock = (blockType: BlockType): boolean => {
  if (blockType === "IMAGE") return true;
  return false;
};

export const isLinkBlock = (blockType: BlockType): boolean => {
  if (blockType === "LINK") return true;
  return false;
};
