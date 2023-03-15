import { useInfiniteQuery } from "react-query";
import { noticeLoadList } from "../../libs/apis/notice/loadList";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";
import { NoticeLoadListRequestType } from "../../types/notice/loadList/request";

export default function useInfiniteNoticeList({
  size,
  title,
}: NoticeLoadListRequestType) {
  return useInfiniteQuery(
    ["noticeListInfiniteQuery", title ? ["=", title] : ""],
    ({ pageParam = 0 }) =>
      noticeLoadList({
        page: pageParam,
        size: size,
        title: title,
      }),
    {
      ...genericQueryOptions,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return allPages.length < lastPage.totalPage ? nextPage : undefined;
      },
    }
  );
}
