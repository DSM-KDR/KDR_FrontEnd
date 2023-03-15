import axios from "axios";
import { CategoryDeleteRequestType } from "../../../../types/category/delete/request";
import { getCookie } from "../../../utils/cookie";

export const categoryDelete = async ({
  id,
}: CategoryDeleteRequestType): Promise<boolean> =>
  await axios
    .delete(`${process.env.REACT_APP_BASE_URL}/category/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
