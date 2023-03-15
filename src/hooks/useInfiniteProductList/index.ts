import { useInfiniteQuery } from "react-query";
import { productLoadList } from "../../libs/apis/product/loadList";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";
import { ProductLoadListRequestType } from "../../types/product/loadList/request";

export default function useInfiniteProductList({
  size,
  name,
  id,
}: ProductLoadListRequestType) {
  return useInfiniteQuery(
    ["productListQuery", id ? ["-", id] : "", name ? ["=", name] : ""],
    ({ pageParam = 0 }) =>
      productLoadList({
        page: pageParam,
        size: size,
        name: name,
        id: id,
      }),
    {
      ...genericQueryOptions,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length - 1 + 1;
        return allPages.length < lastPage.totalPage ? nextPage : undefined;
      },
    }
  );
}
