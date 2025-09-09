import { createGetQuery } from "@/lib/reactQuery";
import { ListRes } from "../../../lib/type";

export const ListTag = {
  url: () => "api/archive/tags",
  key: () => ["listTags"],
};
export const useListTagsQuery = createGetQuery<void, ListRes<string>>();
