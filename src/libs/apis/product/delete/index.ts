import axios from "axios";
import { ProductDeleteRequestType } from "../../../../types/product/delete/request";
import { getCookie } from "../../../utils/cookie";

export const productDelete = async ({
  id,
}: ProductDeleteRequestType): Promise<boolean> =>
  await axios
    .delete(`${process.env.REACT_APP_BASE_URL}/product/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
