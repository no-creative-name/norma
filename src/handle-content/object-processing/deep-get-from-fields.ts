import { IContentData, IContentDataResolved } from "../../interfaces/content";

export const deepGetFromFields = (fieldObject: IContentDataResolved, propertyArray: string[]): any => {
    const _ = require("lodash");

    return _.get(fieldObject, propertyArray);
};
