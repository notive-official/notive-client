import { createGetQuery } from "@/lib/reactQuery";
import { ListRes } from "../../../lib/type";

export const listTagsKey = "listTags";
export const useListTagsQuery = createGetQuery<ListRes<string>>(
  "api/archive/tags",
  listTagsKey
);
