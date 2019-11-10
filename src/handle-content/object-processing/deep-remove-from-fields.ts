import { IContentData } from "../../interfaces/content";

export const deepRemoveFromFields = (fieldObject: IContentData, propertyArray: string[]) => {
    const correctKey = Object.keys(fieldObject).find((key) => key === propertyArray[0]);
    const _ = require("lodash");
    if (correctKey && propertyArray.slice(1).length > 0) {
        return _.unset(fieldObject[correctKey].value, propertyArray.slice(1));
    }
    return fieldObject;
};
