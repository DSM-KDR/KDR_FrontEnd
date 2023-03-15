import axios from "axios";
import { NoticeDeleteRequestType } from "../../../../types/notice/delete/request";
import { getCookie } from "../../../utils/cookie";

export const noticeDelete = async ({
  id,
}: NoticeDeleteRequestType): Promise<boolean> =>
  await axios
    .delete(`${process.env.REACT_APP_BASE_URL}/notice/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
