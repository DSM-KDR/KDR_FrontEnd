import axios from "axios";
import * as C from "../../../utils/cookie";

export const authRefresh = async () =>
  await axios
    .put(
      `${process.env.REACT_APP_BASE_URL}/auth/refresh`,
      {},
      {
        headers: {
          "refresh-token": `${C.getCookie("refreshToken")}`,
        },
      }
    )
    .then((response) => {
      C.setCookie("accessToken", response.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      C.setCookie("refreshToken", response.data.refreshToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
    })
    .catch(() => {
      if (C.getCookie("accessToken"))
        alert("보안을 위해 로그아웃되었습니다. 다시 로그인해주세요.");
      C.deleteCookie("accessToken");
    });
