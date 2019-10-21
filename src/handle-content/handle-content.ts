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
    let adjusted: Content = JSON.parse(JSON.stringify(input));

    if(adjusted.type === contentConfig.inputType && contentConfig.parameterAdjustments) {
        contentConfig.parameterAdjustments.map(parameterAdjustment => {
            let value;
            if(Array.isArray(parameterAdjustment.inputIdentifier)) {
                value = deepGet(adjusted.data, parameterAdjustment.inputIdentifier);
                adjusted.data = deepRemove(adjusted.data, parameterAdjustment.inputIdentifier);
            }
            else {
                value = deepGet(adjusted.data, [parameterAdjustment.inputIdentifier]);
                adjusted.data = deepRemove(adjusted.data, [parameterAdjustment.inputIdentifier]);
            }

            if(Array.isArray(parameterAdjustment.outputIdentifier)) {
                adjusted.data = deepSet(adjusted.data, parameterAdjustment.outputIdentifier, value);
            }
            else {
                adjusted.data = deepSet(adjusted.data, [parameterAdjustment.outputIdentifier], value);
            }
        });
    };

    let output: Content = {
        type: '',
        data: {}
    };

    if(!adjusted.data || !adjusted.type) {
        return adjusted;
    }
    
    Object.keys(adjusted.data || {}).forEach(key => {
        if(Array.isArray(adjusted.data[key])) {
            output.data[key] = adjusted.data[key].map(dataParameter => adjustContentToConfig(dataParameter, contentConfig));
        }
        else if(typeof adjusted.data[key] === 'object') {
            output.data[key] = adjustContentToConfig(adjusted.data[key], contentConfig);
        }
        else {
           output.data[key] = adjusted.data[key];
        }
    });
    
    if(adjusted.type) {
        if(adjusted.type === contentConfig.inputType) {
            if(contentConfig.outputType) {
                output.type = contentConfig.outputType;
            }
        }
        else {
            output.type = adjusted.type;
        }
    }
    return output;
}