import { IContentData } from "../../interfaces/content";

export const deepGetFromFields = (fieldObject: IContentData, propertyArray: string[]): any => {
    const correctKey = Object.keys(fieldObject).find((key) => key === propertyArray[0]);
    const _ = require("lodash");

    if (correctKey) {
        if (propertyArray.slice(1).length > 0) {
            return _.get(fieldObject[correctKey].value, propertyArray.slice(1));
        }
        return fieldObject;
    }
    return undefined;
};
