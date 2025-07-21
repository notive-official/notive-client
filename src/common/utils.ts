import { BlockType } from "./types";

export const isTextBlock = (blockType: BlockType): boolean => {
  if (blockType === "h1") return true;
  if (blockType === "h2") return true;
  if (blockType === "h3") return true;
  if (blockType === "paragraph") return true;
  return false;
};
