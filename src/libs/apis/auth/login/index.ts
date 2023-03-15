import axios from "axios";
import { AuthLoginRequestType } from "../../../../types/auth/login/request";
import { AuthLoginResponseType } from "../../../../types/auth/login/response";
import { setCookie } from "../../../utils/cookie";

export const authLogin = async ({
  password,
}: AuthLoginRequestType): Promise<boolean> =>
  await axios
    .post<AuthLoginResponseType>(
      `${process.env.REACT_APP_BASE_URL}/auth/login`,
      {
        password: password,
      }
    )
    .then((response) => {
      setCookie("accessToken", response.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      setCookie("refreshToken", response.data.refreshToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      return true;
    })
    .catch(() => {
      return false;
    });
