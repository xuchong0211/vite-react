import { useHistory } from "react-router-dom";
import { useGet, usePost, TOKEN_KEY, postData } from "./utils";
import {
  ModelInterface,
  RegisterDataInterface,
  useBookingData,
  useUserData,
} from "../../models/data";
import { message, Modal } from "antd";
import Storage from "../../lib/ts/Storage";
import _get from "lodash/get";

const LOGIN_URL = "/api/v1/login";
const VALIDATE_URL = "/api/v1/validate";
const SEND_CODE_URL = "/api/v1/sendCode";
const REGISTER_URL = "/api/v1/register";
const REGISTER_LIST_URL = "/api/v1/registerList";

export interface SendCodeResponse {
  phone: string;
  code: string;
  message?: string | undefined;
}

export const useSendCodeRequest = () => {
  const get = useGet();
  return (data: { phone: string }) => get(SEND_CODE_URL, data);
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

export const useSignInRequest = () => {
  const post = usePost();
  const user: ModelInterface = useUserData();
  const booking: ModelInterface = useBookingData();
  return (data: { phone: string; code: string }) =>
    post(LOGIN_URL, data)
      .then((response: any) => {
        console.log("user sign in response", response);
        const { register, ...rest } = response;
        user.value = rest;
        user.update();
        booking.value.patient = _get(register, "patient", {});
        booking.value.ancCheckList = _get(register, "ancCheckList", {});
        booking.update();
        Storage.set(TOKEN_KEY, response?.access_token);
        return response;
      })
      .catch((error) => {
        signInErrorHandler(error);
      });
};

export const useValidateRequest = () => {
  const user: ModelInterface = useUserData();
  const booking: ModelInterface = useBookingData();
  return () =>
    postData(VALIDATE_URL, undefined)
      .then((response: any) => {
        console.log("user sign in response", response);
        const { register, ...rest } = response;
        user.value = rest;
        user.update();
        booking.value.patient = _get(register, "patient", {});
        booking.value.ancCheckList = _get(register, "ancCheckList", {});
        booking.update();
        Storage.set(TOKEN_KEY, response?.access_token);
        return true;
      })
      .catch((error) => {
        console.log("validate error", error);
        return false;
      });
};

export const useLogoutRequest = () => {
  const user: ModelInterface = useUserData();
  const booking: ModelInterface = useBookingData();
  let history = useHistory();
  return () => {
    user.value = {};
    user.update();
    booking.value = {};
    booking.update();
    Storage.set(TOKEN_KEY, undefined);
    history.push("/");
  };
};

export const useRegisterRequest = () => {
  const post = usePost();
  const history = useHistory();
  const booking: ModelInterface = useBookingData();
  return (data: RegisterDataInterface) => {
    return post(REGISTER_URL, data).then((response: any) => {
      // console.log("user sign in response", response);
      booking.value = {};
      booking.update();
      history.push("/register/success");
      return response;
    });
  };
};

export const useRegisterListRequest = (limit?: number) => {
  const get = useGet();
  return (
    params?: { date?: number; skip?: number } | undefined
  ): Promise<any> => {
    return get(REGISTER_LIST_URL, { ...params, limit });
  };
};
