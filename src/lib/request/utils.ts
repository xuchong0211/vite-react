import queryString from "query-string";
import { useLoading } from "../../models/data";
import Storage from "../../lib/ts/Storage";
import { handleError } from "./errors";

const serverUrl = "http://192.168.2.104:8080";

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
    throw response;
  }
}

function postData(url: string, data: Object | undefined) {
  // Default options are marked with *
  const token = Storage.get(TOKEN_KEY);
  const headers = new Headers({
    // 'user-agent': 'Mozilla/4.0 MDN Example',
    "content-type": "application/json",
  });
  if (token) {
    // @ts-ignore
    headers.append("Authorization", `bearer ${token}`);
  }
  return fetch(serverUrl + url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, same-origin, *omit
    headers,
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // *client, no-referrer
  }).then(checkStatus); // parses response to JSON
}

function getData(url: string, data: Object | undefined) {
  // Default options are marked with *
  url = data ? `${serverUrl}${url}?${queryString.stringify(data)}` : url;
  return fetch(url, {
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, same-origin, *omit
    headers: {
      // 'user-agent': 'Mozilla/4.0 MDN Example',
      "content-type": "application/json",
    },
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // *client, no-referrer
  }).then((response) => response.json()); // parses response to JSON
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
        throw { status: 9001, message: response.message };
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

export function useRequest(handleErr?: (...args: AnyObject[]) => void) {
  const loading = useLoading();
  const get = requestWrapper(getData, loading, handleErr || handleError);
  const post = requestWrapper(postData, loading, handleErr || handleError);
  return { get, post };
}

export function useGet(handleErr?: (...args: AnyObject[]) => void) {
  return requestWrapper(getData, useLoading(), handleErr || handleError);
}

export function usePost(handleErr?: (...args: AnyObject[]) => void) {
  return requestWrapper(postData, useLoading(), handleErr || handleError);
}
