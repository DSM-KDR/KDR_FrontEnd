import { useQuery } from "react-query";
import { productLoad } from "../../libs/apis/product/load";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";
import { ProductLoadRequestType } from "../../types/product/load/request";

export default function useProduct({ id }: ProductLoadRequestType) {
  return useQuery(["productQuery", id], () => productLoad({ id: id }), {
    ...genericQueryOptions,
    enabled: id !== "create",
  });
}
