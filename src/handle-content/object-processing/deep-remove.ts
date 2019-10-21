export const deepRemove = (object: any, parameterArray: string[]): any => {
    const objectCopy = JSON.parse(JSON.stringify(object));

    if(!object) {
        throw new Error(`Couldn't get value for ${parameterArray.toString()}: object is undefined`);
    }
    if(!parameterArray) {
        throw new Error(`Couldn't get value in ${JSON.stringify(object)}: parameter array is undefined`);
    }

    let value = objectCopy;
    parameterArray.forEach((parameter: string, index: number) => {
        if(index === parameterArray.length - 1 && value[parameter]) {
            delete value[parameter];
        }
        else if(value[parameter]) {
            value = value[parameter];
        }
    });
    return objectCopy;
}