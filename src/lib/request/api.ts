import { useHistory } from "react-router-dom";
import { useGet, useRequest, usePost, TOKEN_KEY } from "./utils";
import { ModelInterface, useUserData } from "../../models/data";
import { Modal } from "antd";
import Storage from "../../lib/ts/Storage";

export const SEND_CODE = "/api/v1/sendCode";
export const LOGIN = "/api/v1/login";

export interface SendCodeResponse {
  phone: string;
  code: string;
  message?: string | undefined;
}

export const useSendCode = () => {
  const get = useGet();
  return (data: { phone: string }) => get(SEND_CODE, data);
};

const signInErrorHandler = (response: AnyObject) => {
  console.log("response", response);
  let title = "Error";
  let content = "Server error";
  if (response.status === 401) {
    title = "Validation Error";
    content = "code is invalid";
  }
  Modal.error({
    title,
    content,
  });
  throw Error();
};

export const useSignIn = () => {
  const post = usePost(signInErrorHandler);
  const user: ModelInterface = useUserData();
  return (data: { phone: string; code: string }) =>
    post(LOGIN, data).then((response) => {
      console.log("user sign in response", response);
      user.value = response;
      user.update();
      Storage.set(TOKEN_KEY, response?.access_token);
      return response;
    });
};

export const useLogout = () => {
  const user: ModelInterface = useUserData();
  let history = useHistory();
  return () => {
    user.value = {};
    user.update();
    history.push("/");
  };
};
