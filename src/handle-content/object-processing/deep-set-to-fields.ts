import { IContentData, IContentDataResolved } from "../../interfaces/content";

export const deepSetToFields = (
    fieldObject: IContentDataResolved,
    propertyArray: string[], value: any,
): IContentDataResolved => {
    const correctKey = Object.keys(fieldObject).find((key) => key === propertyArray[0]);
    const _ = require("lodash");
    return _.set(fieldObject, propertyArray, value);
};
