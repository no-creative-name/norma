import { Content } from "../interfaces/content";
import { ContentHandler } from "../interfaces/content-handler";
import { ContentConfig } from "../interfaces/adapter-config";
import { deepGet } from "./object-processing/deep-get";
import { deepSet } from "./object-processing/deep-set";
import { deepRemove } from "./object-processing/deep-remove";

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
    let processedInput: Content = JSON.parse(JSON.stringify(input));

    if(processedInput.type === contentConfig.inputType && contentConfig.propertyAdjustments) {
        contentConfig.propertyAdjustments.map(propertyAdjustment => {
            let value;
            if(Array.isArray(propertyAdjustment.inputIdentifier)) {
                value = deepGet(processedInput.data, propertyAdjustment.inputIdentifier);
                processedInput.data = deepRemove(processedInput.data, propertyAdjustment.inputIdentifier);
            }
            else {
                value = deepGet(processedInput.data, [propertyAdjustment.inputIdentifier]);
                processedInput.data = deepRemove(processedInput.data, [propertyAdjustment.inputIdentifier]);
            }

            if(Array.isArray(propertyAdjustment.outputIdentifier)) {
                processedInput.data = deepSet(processedInput.data, propertyAdjustment.outputIdentifier, value);
            }
            else {
                processedInput.data = deepSet(processedInput.data, [propertyAdjustment.outputIdentifier], value);
            }
        });
    };

    let output: Content = {
        type: '',
        data: {}
    };

    if(!processedInput.data || !processedInput.type) {
        return processedInput;
    }
    
    Object.keys(processedInput.data || {}).forEach(key => {
        if(Array.isArray(processedInput.data[key])) {
            output.data[key] = processedInput.data[key].map(prop => adjustContentToConfig(prop, contentConfig));
        }
        else if(typeof processedInput.data[key] === 'object') {
            output.data[key] = adjustContentToConfig(processedInput.data[key], contentConfig);
        }
        else {
           output.data[key] = processedInput.data[key];
        }
    });
    
    if(processedInput.type) {
        if(processedInput.type === contentConfig.inputType) {
            if(contentConfig.outputType) {
                output.type = contentConfig.outputType;
            }
        }
        else {
            output.type = processedInput.type;
        }
    }
    return output;
}