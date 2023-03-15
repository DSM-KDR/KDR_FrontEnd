import axios from "axios";
import { NoticeUpdateRequestType } from "../../../../types/notice/update/request";
import { getCookie } from "../../../utils/cookie";

export const noticeUpdate = async ({
  id,
  title,
  content,
}: NoticeUpdateRequestType): Promise<boolean> =>
  await axios
    .put(
      `${process.env.REACT_APP_BASE_URL}/notice/${id}`,
      {
        title: title,
        content: content,
      },
      {
        headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
      }
    )
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
