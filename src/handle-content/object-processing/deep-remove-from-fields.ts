import { IContentData } from "../../interfaces/content";

export const deepRemoveFromFields = (fieldObject: IContentData, propertyArray: string[]): IContentData => {
    const correctKey = Object.keys(fieldObject).find((key) => key === propertyArray[0]);
    const _ = require("lodash");

    if (correctKey && propertyArray.slice(1).length > 0) {
        const field = fieldObject[correctKey];
        if (propertyArray.slice(1).length > 0) {
            for (let i = propertyArray.length; i > 1; i--) {
                const propValue = _.get(field.value, propertyArray.slice(1, i));

                if (propValue && i === propertyArray.length) {
                    _.unset(field.value, propertyArray.slice(1, i));
                }
                if (propValue && typeof propValue === "object" && Object.entries(propValue).length === 0) {
                    _.unset(field.value, propertyArray.slice(1, i));
                }
            }

            if (Object.entries(field.value).length === 0) {
                delete fieldObject[correctKey];
            }
        }
    } else {
        delete fieldObject[correctKey];
    }
    return fieldObject;
};
