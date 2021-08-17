import queryString from "query-string";
import { useLoading } from "../../models/data";
import Storage from "../../lib/ts/Storage";

// const mode = import.meta.env.MODE;

export const isDev: () => boolean = () => {
  return import.meta.env.DEV;
};

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const TOKEN_KEY = "reliance_token";

type RequestType = [string, Object | undefined];

interface ResponseType extends AnyObject {
  success?: boolean;
  message?: string;
}

async function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    const data = await response.json().then((args: any) => {
      return args;
    });
    return { success: true, ...data };
  } else {
    console.log("check status error", response);
    throw response;
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

function postData(url: string, data: Object | undefined) {
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
  url = data ? `${serverUrl}${url}?${queryString.stringify(data)}` : url;
  return fetch(url, {
    ...requestConfig,
    headers: {
      // 'user-agent': 'Mozilla/4.0 MDN Example',
      "content-type": "application/json",
    },
    method: "GET",
  }).then(checkStatus); // parses response to JSON
}

const requestWrapper = (
  request: (...arge: RequestType) => any,
  loading: { value: boolean },
  errorHandlers?: (err: any) => void
) => {
  return async (...args: RequestType) => {
    try {
      loading.value = true;
      const response: ResponseType = await request(...args);
      const { success, ...rest } = response;
      console.log("rest.................", rest);
      if (!success) {
        throw response;
      }
      loading.value = false;
      return rest;
    } catch (error: any) {
      console.log("error", error);
      loading.value = false;
      if (errorHandlers) {
        errorHandlers(error);
      } else {
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
  return requestWrapper(getData, useLoading());
}

export function usePost() {
  return requestWrapper(postData, useLoading());
}
