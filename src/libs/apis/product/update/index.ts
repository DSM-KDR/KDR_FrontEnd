import axios from "axios";
import { ProductUpdateRequestType } from "../../../../types/product/update/request";
import { getCookie } from "../../../utils/cookie";

export const productUpdate = async ({
  id,
  name,
  image,
  category,
  capacity,
  description,
  price,
  origin,
}: ProductUpdateRequestType): Promise<boolean> =>
  await axios
    .put(
      `${process.env.REACT_APP_BASE_URL}/product/${id}`,
      {
        name: name,
        image: image,
        category: category,
        capacity: capacity,
        description: description,
        price: price,
        origin: origin,
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
