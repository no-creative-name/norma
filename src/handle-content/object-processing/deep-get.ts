export const deepGet = (object: any, propertyArray: string[]): any => {
    if (!object) {
        throw new Error(`Couldn't get value for ${propertyArray.toString()}: object is undefined`);
    }
    if (!propertyArray) {
        throw new Error(`Couldn't get value in object: propertyArray is undefined`);
    }

    let value = object;
    propertyArray.forEach((property) => {
        value = value[property] || undefined;
    });
    return value;
};
