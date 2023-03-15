import axios from "axios";
import { NoticeCreateRequestType } from "../../../../types/notice/create/request";
import { getCookie } from "../../../utils/cookie";

export const noticeCreate = async ({
  title,
  content,
}: NoticeCreateRequestType): Promise<boolean> =>
  await axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/notice`,
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
