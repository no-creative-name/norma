import _ from "lodash";
import { IContentDataResolved } from "../../interfaces/content";

export const deepGetFromFields = (fieldObject: IContentDataResolved, propertyArray: string[]): any => {
    return _.get(fieldObject, propertyArray);
};
