import { createModel, useModel } from "./Utils";

export interface ModelInterface extends AnyObject {
  value: any;
  update: () => void;
}

interface Step1Interface extends AnyObject {
  name?: string;
  citizenId?: string;
  phone: string;
  code?: string;
}

const loading = createModel(false);
const user = createModel({ username: null });
const bookingData = createModel({ step1: {}, step2: {}, step3: {} });

export const useLoading = () => {
  useModel(loading);
  return loading;
};

export const useBookingData = () => {
  useModel(bookingData);
  return bookingData;
};

export const useUserData = () => {
  useModel(user);
  return user;
};
