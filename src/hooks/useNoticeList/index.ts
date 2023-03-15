import { useQuery } from "react-query";
import { noticeLoadList } from "../../libs/apis/notice/loadList";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";
import { NoticeLoadListRequestType } from "../../types/notice/loadList/request";

export default function useNoticeList({
  page,
  size,
  title,
}: NoticeLoadListRequestType) {
  return useQuery(
    ["noticeListQuery", page, title ? ["=", title] : ""],
    () =>
      noticeLoadList({
        page: page,
        size: size,
        title: title,
      }),
    genericQueryOptions
  );
}
