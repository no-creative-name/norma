export const deepRemove = (object: any, propertyArray: string[]): any => {
    const objectCopy = Object.assign({}, object);

    if (!object) {
        throw new Error(`Couldn't get value for ${propertyArray.toString()}: object is undefined`);
    }
    if (!propertyArray) {
        throw new Error(`Couldn't get value in object: property array is undefined`);
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
