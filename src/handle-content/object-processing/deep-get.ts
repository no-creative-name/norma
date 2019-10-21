export const deepGet = (object: any, parameterArray: string[]): any => {
    if(!object) {
        throw new Error(`Couldn't get value for ${parameterArray.toString()}: object is undefined`);
    }
    if(!parameterArray) {
        throw new Error(`Couldn't get value in ${JSON.stringify(object)}: parameter array is undefined`);
    }

    let value = object;
    parameterArray.forEach(parameter => {
        value = value[parameter] || undefined;
    });
    return value;
}