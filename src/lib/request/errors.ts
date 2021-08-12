import { Modal } from "antd";

export const handleError = (err: any): void => {
  console.log("fetch err: ", err);

  if (err.status === 9001) {
    Modal.error({
      title: "Error",
      content: err.message || "try it again.",
    });
  } else if (err.status === 401) {
    Modal.error({
      title: "Error",
      content: "unauthorized user",
    });
  }

  // if (err.status === 403 && err.error === 'forbidden') {
  //   const error = { ...err, goBack: true };
  //   throw error;
  // } else if (err.message && err.message === ERROR_ETIMEDOUT) {
  //   const error = { status: err.status || 0, message: 'please try it later' };
  //   throw error;
  // } else if (
  //     err.status === 400 &&
  //     err.reason === 'Malformed AuthSession cookie. Please clear your cookies.'
  // ) {
  //   const error = { status: 401, message: err.reason };
  //   throw error;
  // } else if (err.status === 404) {
  //   const error = { status: 404, message: err.error || err.name || '' };
  //   throw error;
  // } else if (err.error === 'unauthorized') {
  //   const error = { message: err.reason };
  //   throw error;
  // } else if (err.status === 409 || err.status === 401) {
  //   throw err;
  // }
};
