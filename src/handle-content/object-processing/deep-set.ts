
export const deepSet = (object: any, parameterArray: string[], value: any): any => {
    const objectCopy = JSON.parse(JSON.stringify(object));
    
    if(!object) {
        throw new Error(`Couldn't set value for ${parameterArray.toString()}: object is undefined`);
    }
    if(!parameterArray) {
        throw new Error(`Couldn't set value in ${JSON.stringify(object)}: parameter array is undefined`);
    }
    if(!value) {
        throw new Error(`Couldn't set value for ${parameterArray.toString()} in ${JSON.stringify(object)}: value is undefined`);
    }

    let currentLevel = objectCopy;
    let goDeeper = true;
    let restParameters;
    
    // find master object level on where the next parameter of the array does not exist yet
    parameterArray.forEach((parameter: string, index: number) => {
        if(goDeeper) {
            if(!currentLevel[parameter]) {
                restParameters = parameterArray.slice(index);
                goDeeper = false;
            }
            else {
                currentLevel = currentLevel[parameter] || undefined;
            }
        }
    });
    
    // create object to insert into that level of master object
    let dataToInsert = {};
    const reversedRestParameters = [...restParameters].reverse();
    
    reversedRestParameters.map((param, index) => {
        let paramObj = {};
        if(index === 0) {
            paramObj[param] = value;
            dataToInsert = paramObj;
        }
        else if (index < reversedRestParameters.length - 1) {
            paramObj[param] = dataToInsert;
            dataToInsert = paramObj;
        }
    });
    
    // insert new object into master object
    if(currentLevel[restParameters[0]] !== undefined) {
        throw new Error(`Deep set failed: tried to overwrite existing parameter ${restParameters[0]} in ${objectCopy}`)
    }
    if(restParameters.length === 1) {
        currentLevel[restParameters[0]] = dataToInsert[restParameters[0]];
    }
    else {
        currentLevel[restParameters[0]] = dataToInsert;
    }
    
    return objectCopy;
}
