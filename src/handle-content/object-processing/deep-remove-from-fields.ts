import { IContentData, IContentDataResolved } from "../../interfaces/content";

export const deepRemoveFromFields = (
    fieldObject: IContentDataResolved,
    propertyArray: string[],
): IContentDataResolved => {
    const _ = require("lodash");

    for (let i = propertyArray.length; i > 0; i--) {
        const propValue = _.get(fieldObject, propertyArray.slice(0, i));

        if (propValue && i === propertyArray.length) {
            _.unset(fieldObject, propertyArray.slice(0, i));
        }
        if (propValue && typeof propValue === "object" && Object.entries(propValue).length === 0) {
            _.unset(fieldObject, propertyArray.slice(0, i));
        }
    }
    return fieldObject;
};
