import _ from "lodash";
import { IContentDataResolved } from "../../interfaces/content";

export const deepSetToFields = (
    fieldObject: IContentDataResolved,
    propertyArray: string[], value: any,
): IContentDataResolved => {
    return _.set(fieldObject, propertyArray, value);
};
