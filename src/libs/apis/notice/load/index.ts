import axios from "axios";
import { NoticeLoadRequestType } from "../../../../types/notice/load/request";
import { NoticeLoadResponseType } from "../../../../types/notice/load/response";

export const noticeLoad = async ({
  id,
}: NoticeLoadRequestType): Promise<NoticeLoadResponseType> =>
  await axios
    .get<NoticeLoadResponseType>(
      `${process.env.REACT_APP_BASE_URL}/notice/${id}`
    )
    .then((response) => {
      return response.data;
    });
