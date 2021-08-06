import {createModel, useModel} from "./Utils";

const count = createModel(1);
const count2 = createModel({a: {b: {c: 1}}})

export const useCount = () => {
    useModel(count);
    return count
}
export const useCount2 = () => {
    useModel(count2);
    return count2;
}
