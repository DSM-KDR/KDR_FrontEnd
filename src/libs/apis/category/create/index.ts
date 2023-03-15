import axios from "axios";
import { CategoryCreateRequestType } from "../../../../types/category/create/request";
import { base64ToBlob } from "../../../utils/base64ToBlob";
import { getCookie } from "../../../utils/cookie";
import { getBase64Type } from "../../../utils/getBase64Type";

export const categoryCreate = async ({
  category,
  image,
}: CategoryCreateRequestType): Promise<boolean> => {
  let formData = new FormData();
  formData.append(
    "file",
    new File([base64ToBlob(image)], `image.${getBase64Type(image)}`)
  );
  const categoryRequest = {
    category: category,
  };
  formData.append(
    "categoryRequest",
    new Blob([JSON.stringify(categoryRequest)], {
      type: "application/json",
    })
  );

  return await axios
    .post(`${process.env.REACT_APP_BASE_URL}/category`, formData, {
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
