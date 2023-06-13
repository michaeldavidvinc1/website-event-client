import { USER_LOGIN, USER_LOGOUT } from "./constants";

export function userLogin(token, role, email, refreshToken) {
  return {
    type: USER_LOGIN,
    token,
    role,
    email,
    refreshToken,
  };
}

export function userLogout() {
  localStorage.removeItem("auth");
  return {
    type: USER_LOGOUT,
  };
}
