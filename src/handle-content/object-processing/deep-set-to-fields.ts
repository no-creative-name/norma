import { IContentData } from "../../interfaces/content";

export const deepSetToFields = (fieldObject: IContentData, propertyArray: string[], value: any) => {
    const correctKey = Object.keys(fieldObject).find((key) => key === propertyArray[0]);
    const _ = require("lodash");

    if (correctKey) {
        if (propertyArray.slice(1).length > 0) {
            return Object.assign(fieldObject, {[correctKey]: {
                fieldType: fieldObject[correctKey].fieldType,
                value: _.set(fieldObject[correctKey].value, propertyArray.slice(1), value),
            }});
        } else {
            return Object.assign(fieldObject, {[correctKey]: {
                fieldType: fieldObject[correctKey].fieldType,
                value,
            }});
        }
    } else {
        if (propertyArray.slice(1).length > 0) {
            return Object.assign(fieldObject, {[propertyArray[0]]: {
                fieldType: undefined,
                value: _.set({}, propertyArray.slice(1), value),
            }});
        } else {
            return Object.assign(fieldObject, {[propertyArray[0]]: {
                fieldType: undefined,
                value,
            }});
        }
    }
};
