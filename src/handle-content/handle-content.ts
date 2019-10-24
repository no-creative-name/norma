import { Content } from "../interfaces/content";
import { ContentHandler } from "./content-handler";
import { ContentConfig } from "../interfaces/adapter-config";
import { deepGet } from "./object-processing/deep-get";
import { deepSet } from "./object-processing/deep-set";
import { deepRemove } from "./object-processing/deep-remove";

export const handleContent: ContentHandler = (content: Content, contentConfigs: ContentConfig[]): Content => {
    if(!content || !contentConfigs) {
        throw new Error('Input is invalid.');
    }
    
    let handledContent = Object.assign({}, content);

    contentConfigs.forEach(contentConfig => {
        handledContent = adjustContentToConfig(handledContent, contentConfig)
    });
    
    return handledContent;
};

export const adjustContentToConfig = (input: Content, contentConfig: ContentConfig): Content => {
    let processedInput: Content = Object.assign({}, input);
    
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

            if(propertyAdjustment.valueConverter) {
                try {
                    value = propertyAdjustment.valueConverter(value);
                }
                catch(error) {
                    throw new Error(`Couldn't convert value: ${error}`)
                }
            }

            if(propertyAdjustment.outputIdentifier) {
                if(Array.isArray(propertyAdjustment.outputIdentifier)) {
                    processedInput.data = deepSet(processedInput.data, propertyAdjustment.outputIdentifier, value);
                }
                else {
                    processedInput.data = deepSet(processedInput.data, [propertyAdjustment.outputIdentifier], value);
                }
            }
            else {
                if(Array.isArray(propertyAdjustment.inputIdentifier)) {
                    processedInput.data = deepSet(processedInput.data, propertyAdjustment.inputIdentifier, value);
                }
                else {
                    processedInput.data = deepSet(processedInput.data, [propertyAdjustment.inputIdentifier], value);
                }
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