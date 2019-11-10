import { IContentData } from "../../interfaces/content";

export const deepRemove = (object: any, propertyArray: string[]): any => {
    const objectCopy = Object.assign({}, object);

    if (!object) {
        throw new Error(`Couldn't remove value for ${propertyArray.toString()}: object is undefined`);
    }
    if (!propertyArray) {
        throw new Error(`Couldn't remove value in object: property array is undefined`);
    }

    let value = objectCopy;
    propertyArray.forEach((property: string, index: number) => {
        if (index === propertyArray.length - 1 && value[property]) {
            delete value[property];
        } else if (value[property]) {
            value = value[property];
        }
    });
    return objectCopy;
};

export const deepRemoveFromFields = (fieldObject: IContentData, propertyArray: string[]) => {
    const correctKey = Object.keys(fieldObject).find((key) => key === propertyArray[0]);

    if (correctKey && propertyArray.slice(1).length > 0) {
        return deepRemove(fieldObject[correctKey].value, propertyArray.slice(1));
    }
    return fieldObject;
};
