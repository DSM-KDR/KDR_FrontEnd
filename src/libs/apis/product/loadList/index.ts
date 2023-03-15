import axios from "axios";
import { ProductLoadListRequestType } from "../../../../types/product/loadList/request";
import { ProductLoadListResponseType } from "../../../../types/product/loadList/response";

export const productLoadList = async ({
  page,
  size,
  name,
  id,
}: ProductLoadListRequestType): Promise<ProductLoadListResponseType> =>
  await axios
    .get<ProductLoadListResponseType>(
      `${process.env.REACT_APP_BASE_URL}/product${
        name && name !== "" && id && id !== 0 ? "/combine" : ""
      }${name && name !== "" && (!id || id === 0) ? "/search" : ""}${
        (!name || name === "") && id && id !== 0 ? "/category" : ""
      }`,
      {
        params: {
          page: page,
          size: size,
          name: name !== "" ? name : undefined,
          id: id !== 0 ? id : undefined,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
