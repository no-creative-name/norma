import { IContentData } from "../../interfaces/content";

export const deepGet = (object: any, propertyArray: string[]): any => {
    if (!object) {
        throw new Error(`Couldn't get value for ${propertyArray.toString()}: object is undefined`);
    }
    if (!propertyArray) {
        throw new Error(`Couldn't get value in object: propertyArray is undefined`);
    }

    let value = object;
    for (const property of propertyArray) {
        if (value[property]) {
            value = value[property];
        } else {
            return undefined;
        }
    }
    return value;
};

export const deepGetFromFields = (fieldObject: IContentData, propertyArray: string[]) => {
    const correctKey = Object.keys(fieldObject).find((key) => key === propertyArray[0]);

    if (correctKey && propertyArray.slice(1).length > 0) {
        return deepGet(fieldObject[correctKey].value, propertyArray.slice(1));
    }
    return fieldObject;
};
