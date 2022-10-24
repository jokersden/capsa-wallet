import Cookies from "universal-cookie";
import { AUTH_EXPIRY_TIME } from "./configs";
import { hashAPhrase } from "./secureStorage";

var cookies = new Cookies();

export const getUserCookie = () => {
  return cookies.get("authenticated_user");
};
export const setUserCookies = (status, at, screen, secret_key) => {
  cookies.set(
    "authenticated_user",
    {
      status,
      at,
      view: screen,
      secret_phrase: hashAPhrase(at, secret_key).toString(),
    },
    {
      path: "/",
      expires: new Date(Date.now() + AUTH_EXPIRY_TIME),
    }
  );
};
export const updateUserScreen = (screen) => {
  var userCookie = cookies.get("authenticated_user");
  userCookie.view = screen;
  cookies.set("authenticated_user", userCookie, {
    path: "/",
    expires: new Date(Date.now() + AUTH_EXPIRY_TIME),
  });
};

export const deleteCookies = (name) => {
  cookies.remove(name)
}
