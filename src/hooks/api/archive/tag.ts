import { createGetQueryWithPredefinedUrl } from "@/lib/reactQuery";
import { ListRes } from "../../../lib/type";

export const listTagsKey = "listTags";
export const useListTagsQuery = createGetQueryWithPredefinedUrl<
  ListRes<string>
>("api/archive/tags", listTagsKey);
