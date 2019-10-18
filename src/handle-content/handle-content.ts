import { Content } from "../interfaces/content";
import { ContentHandler } from "../interfaces/content-handler";
import { ContentConfig } from "../interfaces/adapter-config";

export const handleContent: ContentHandler = (content: Content, contentConfigs: ContentConfig[]): Content => {
    if(!content || !contentConfigs) {
        throw new Error('Input is invalid.');
    }
    let handledContent = JSON.parse(JSON.stringify(content));
    contentConfigs.forEach(contentConfig => {
        handledContent = adjustContentToConfig(handledContent, contentConfig)}
    )
    return handledContent;
};

export const adjustContentToConfig = (input: Content, contentConfig: ContentConfig): Content => {
    let adjusted: Content = JSON.parse(JSON.stringify(input));

    if(input.type === contentConfig.inputType && contentConfig.parameterAdjustments) {
        contentConfig.parameterAdjustments.map(parameterAdjustment => {
            let value;
            if(Array.isArray(parameterAdjustment.inputIdentifier)) {
                value = deepGet(input.data, parameterAdjustment.inputIdentifier);
            }
            else {
                value = deepGet(input.data, [parameterAdjustment.inputIdentifier]);
            }
        });
    }

    let output: Content = {
        type: '',
        data: {}
    };

    Object.keys(input.data || {}).forEach(key => {
        if(Array.isArray(input.data[key])) {
            output.data[key] = input.data[key].map(dataParameter => adjustContentToConfig(dataParameter, contentConfig));
        }
        else if(typeof input.data[key] === 'object') {
            output.data[key] = adjustContentToConfig(input.data[key], contentConfig);
        }
        else {
           output.data[key] = input.data[key];
        }
    });
    
    if(input.type) {
        if(input.type === contentConfig.inputType) {
            if(contentConfig.outputType) {
                output.type = contentConfig.outputType;
            }
        }
        else {
            output.type = input.type;
        }
    }
    return output;
}

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

    let nextLevel = objectCopy;
    let toCreate = false;
    let beenCreated = false;
    let restParameters;
    
    parameterArray.forEach((parameter: string, index: number) => {
        if(!nextLevel[parameter] && !beenCreated) {
            toCreate = true;
        }
        else if (!beenCreated) {
            nextLevel = nextLevel[parameter] || undefined;
        }
        if(toCreate) {
            restParameters = parameterArray.slice(index);
            toCreate = false;
            beenCreated = true;
        }
    });
    

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
    
    if(nextLevel[restParameters[0]] !== undefined) {
        throw new Error(`Deep set failed: tried to overwrite existing parameter ${restParameters[0]} in ${objectCopy}`)
    }
    if(restParameters.length === 1) {
        nextLevel[restParameters[0]] = dataToInsert[restParameters[0]];
    }
    else {
        nextLevel[restParameters[0]] = dataToInsert;
    }
    
    return objectCopy;
}