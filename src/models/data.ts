import {createModel, useModel} from "./Utils";

interface Step1Data extends AnyObject {
    name: string,
    citizenId: string,
    phone: string
    code: string
}

const count = createModel(1);
const count2 = createModel({a: {b: {c: 1}}})
const bookingData = createModel({step1: {}, step2:{}, step3:{}})

export const useCount = () => {
    useModel(count);
    return count
}
export const useCount2 = () => {
    useModel(count2);
    return count2;
}

export const useBookingData = () => {
    useModel(bookingData);
    return bookingData;
}
