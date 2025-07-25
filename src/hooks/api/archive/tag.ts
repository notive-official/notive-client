import { createGetQuery } from "@/lib/reactQuery";
import { ListRes } from "../type";

export const useListTagsQuery = createGetQuery<ListRes<string>>(
  "api/archive/tags",
  "listTags"
);
