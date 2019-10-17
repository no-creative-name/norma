import { Content } from "../interfaces/content";
import { ComponentHandler } from "../interfaces/component-handler";
import { ContentConfig } from "../interfaces/adapter-config";

export const handleComponents: ComponentHandler = (content: Content, contentConfigs: ContentConfig[]): Content => {
    if(!content || !contentConfigs) {
        throw new Error('Input is invalid.');
    }
    let handledContent = JSON.parse(JSON.stringify(content));
    contentConfigs.forEach(contentConfig => {
        handledContent = iterateThroughObject(handledContent, contentConfig)}
    )
    return handledContent;
};

export const iterateThroughObject = (input: Content, contentConfig: ContentConfig): Content => {
    let output: Content = {
        type: '',
        data: {}
    };
            
    Object.keys(input.data || {}).forEach(key => {
        if(Array.isArray(input.data[key])) {
            output.data[key] = input.data[key].map(dataParameter => iterateThroughObject(dataParameter, contentConfig));
        }
        else if(typeof input.data[key] === 'object') {
            output.data[key] = iterateThroughObject(input.data[key], contentConfig);
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