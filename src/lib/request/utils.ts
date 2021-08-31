import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { useLoading } from "../../models/context/loading";
import Storage from "../../lib/ts/Storage";
import { Modal } from "antd";

// const mode = import.meta.env.MODE;

export const isDev: () => boolean = () => {
  return import.meta.env.DEV;
};

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const TOKEN_KEY = "rhcare_token";

type RequestType = [string, Object | undefined];

interface ResponseType extends AnyObject {
  success?: boolean;
  message?: string;
}

async function checkStatus(response: any) {
  // console.log("check status response......................", response);
  if (response.status == 401) {
    return response;
  } else if (response.status >= 200 && response.status < 300) {
    const result = await response.json();
    return { success: true, ...result };
  } else {
    const result = await response.json();
    throw { response, error: result };
  }
}

const requestConfig: AnyObject = {
  // method: "GET", // *GET, POST, PUT, DELETE, etc.
  credentials: "include", // include, same-origin, *omit
  mode: "cors", // no-cors, cors, *same-origin
  redirect: "follow", // manual, *follow, error
  referrer: "no-referrer", // *client, no-referrer
  // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
};

export function postData(url: string, data: Object | undefined) {
  // Default options are marked with *
  const token = Storage.get(TOKEN_KEY);
  const headers = new Headers({
    // 'user-agent': 'Mozilla/4.0 MDN Example',
    "content-type": "application/json",
  });
  if (token) {
    // @ts-ignore
    headers.append("Authorization", `Bearer ${token}`);
  }
  return fetch(serverUrl + url, {
    ...requestConfig,
    body: JSON.stringify(data), // must match 'Content-Type' header

    headers,
    method: "POST",
  }).then(checkStatus); // parses response to JSON
}

function getData(url: string, data: Object | undefined) {
  // Default options are marked with *

  const token = Storage.get(TOKEN_KEY);

  const headers = new Headers({
    // 'user-agent': 'Mozilla/4.0 MDN Example',
    "content-type": "application/json",
  });
  if (token) {
    // @ts-ignore
    headers.append("Authorization", `Bearer ${token}`);
  }
  url = data ? `${serverUrl}${url}?${queryString.stringify(data)}` : url;
  return fetch(url, {
    ...requestConfig,
    headers,
    method: "GET",
  }).then(checkStatus); // parses response to JSON
}

const requestWrapper = (
  request: (...arge: RequestType) => any,
  errorHandlers?: (err: any) => void
) => {
  const { setLoading } = useLoading();
  const history = useHistory();
  return async (...args: RequestType) => {
    try {
      setLoading(true);
      const response: ResponseType = await request(...args);
      const { success, ...rest } = response;
      console.log("rest.................", rest);
      if (!success) {
        throw response;
      }
      setLoading(false);
      return rest;
    } catch (error: any) {
      console.log("error", error);
      setLoading(false);
      if (errorHandlers) {
        errorHandlers(error);
      } else {
        if (error.status == 401) {
          Modal.error({
            title: "Session expired",
            content: "Please login again",
            onOk() {
              history.replace("/");
            },
          });
        } else {
          throw error;
        }
        throw error;
      }
    }
  };
};

// interface RequestOptions {
//   handleErr?: (...args: AnyObject[]) => void;
// }

// export function useRequest() {
//   const loading = useLoading();
//   const get = requestWrapper(getData, loading);
//   const post = requestWrapper(postData, loading);
//   return { get, post };
// }

export function useGet() {
  return requestWrapper(getData);
}

export function usePost() {
  return requestWrapper(postData);
}
