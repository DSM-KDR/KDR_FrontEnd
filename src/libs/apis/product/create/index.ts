import axios from "axios";
import { ProductCreateRequestType } from "../../../../types/product/create/request";
import { base64ToBlob } from "../../../utils/base64ToBlob";
import { getCookie } from "../../../utils/cookie";
import { getBase64Type } from "../../../utils/getBase64Type";

export const productCreate = async ({
  name,
  image,
  category,
  capacity,
  description,
  price,
  origin,
}: ProductCreateRequestType): Promise<boolean> => {
  let formData = new FormData();
  formData.append(
    "file",
    new File([base64ToBlob(image)], `image.${getBase64Type(image)}`)
  );
  const productRequest = {
    name: name,
    category: category,
    capacity: capacity,
    description: description,
    price: price,
    origin: origin,
  };
  formData.append(
    "productRequest",
    new Blob([JSON.stringify(productRequest)], {
      type: "application/json",
    })
  );

  return await axios
    .post(`${process.env.REACT_APP_BASE_URL}/product`, formData, {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
