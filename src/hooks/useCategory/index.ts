import { useQuery } from "react-query";
import { categoryLoadList } from "../../libs/apis/category/load";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";

export default function useCategory(id?: string) {
  return useQuery(
    "categoryQuery",
    () => categoryLoadList(id),
    genericQueryOptions
  );
}
