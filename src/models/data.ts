import { createModel, useModel } from "./Utils";

export interface ModelInterface extends AnyObject {
  value: any;
  update: () => void;
}

export interface PatientInterface extends AnyObject {
  name: string;
  citizenId: string;
  sex: string;
  birthday: string;
}

export interface RegisterDataInterface extends AnyObject {
  patient: PatientInterface;
  symptoms: AnyObject;
  ancCheckList: AnyObject;
  type: string;
}

const loading = createModel(false);
const user = createModel({ username: null });
const bookingData = createModel({
  patient: {},
  symptoms: {},
  ancChecklist: {},
});

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
