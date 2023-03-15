import axios from "axios";
import { CategoryType } from "../../../../types/category/loadList/response";

export const categoryLoadList = async (id?: string): Promise<CategoryType[]> =>
  await axios
    .get<CategoryType[]>(
      `${process.env.REACT_APP_BASE_URL}/category${id ? "/search" : ""}`,
      {
        params: {
          category: id,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
