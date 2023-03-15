import { useQuery } from "react-query";
import { noticeLoad } from "../../libs/apis/notice/load";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";
import { NoticeLoadRequestType } from "../../types/notice/load/request";

export default function useNotice({ id }: NoticeLoadRequestType) {
  return useQuery(["noticeQuery", id], () => noticeLoad({ id: id }), {
    ...genericQueryOptions,
    enabled: id !== "create",
  });
}
