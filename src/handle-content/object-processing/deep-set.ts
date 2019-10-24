
export const deepSet = (object: any, propertyArray: string[], value: any): any => {
    const objectCopy = Object.assign({}, object);
    
    if(!object) {
        throw new Error(`Couldn't set value for ${propertyArray.toString()}: object is undefined`);
    }
    if(!propertyArray) {
        throw new Error(`Couldn't set value in ${JSON.stringify(object)}: property array is undefined`);
    }
    if(value === undefined) {
        throw new Error(`Couldn't set value for ${propertyArray.toString()} in ${JSON.stringify(object)}: value is undefined`);
    }

    let currentLevel = objectCopy;
    let goDeeper = true;
    let restProperties;
    
    // find master object level on where the next property of the array does not exist yet
    propertyArray.forEach((property: string, index: number) => {
        if(goDeeper) {
            if(!currentLevel[property]) {
                restProperties = propertyArray.slice(index);
                goDeeper = false;
            }
            else {
                currentLevel = currentLevel[property] || undefined;
            }
        }
    });
    
    // create object to insert into that level of master object
    let dataToInsert = {};
    const reversedRestProperties = [...restProperties].reverse();
    
    reversedRestProperties.map((prop, index) => {
        let propObj = {};
        if(index === 0) {
            propObj[prop] = value;
            dataToInsert = propObj;
        }
        else if (index < reversedRestProperties.length - 1) {
            propObj[prop] = dataToInsert;
            dataToInsert = propObj;
        }
    });
    
    // insert new object into master object
    if(currentLevel[restProperties[0]] !== undefined) {
        console.warn(`Deep set: Overwritten existing property ${restProperties[0]} in ${JSON.stringify(objectCopy)}`)
    }
    if(restProperties.length === 1) {
        currentLevel[restProperties[0]] = dataToInsert[restProperties[0]];
    }
    else {
        currentLevel[restProperties[0]] = dataToInsert;
    }
    
    return objectCopy;
}
