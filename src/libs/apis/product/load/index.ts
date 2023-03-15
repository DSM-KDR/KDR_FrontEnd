import axios from "axios";
import { ProductLoadRequestType } from "../../../../types/product/load/request";
import { ProductLoadResponseType } from "../../../../types/product/load/response";

export const productLoad = async ({
  id,
}: ProductLoadRequestType): Promise<ProductLoadResponseType> =>
  await axios
    .get<ProductLoadResponseType>(
      `${process.env.REACT_APP_BASE_URL}/product/${id}`
    )
    .then((response) => {
      return response.data;
    });
