import { useQuery } from "react-query";
import { productLoadList } from "../../libs/apis/product/loadList";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";
import { ProductLoadListRequestType } from "../../types/product/loadList/request";

export default function useProductList({
  page,
  size,
  name,
  id,
}: ProductLoadListRequestType) {
  return useQuery(
    ["productListQuery", page, id ? ["-", id] : "", name ? ["=", name] : ""],
    () =>
      productLoadList({
        page: page,
        size: size,
        name: name,
        id: id,
      }),
    genericQueryOptions
  );
}
