import axios from "axios";
import { NoticeLoadListRequestType } from "../../../../types/notice/loadList/request";
import { NoticeLoadListResponseType } from "../../../../types/notice/loadList/response";

export const noticeLoadList = async ({
  page,
  size,
  title,
}: NoticeLoadListRequestType): Promise<NoticeLoadListResponseType> =>
  await axios
    .get<NoticeLoadListResponseType>(
      `${process.env.REACT_APP_BASE_URL}/notice${title ? "/search" : ""}`,
      {
        params: {
          page: page,
          size: size,
          title: title,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
