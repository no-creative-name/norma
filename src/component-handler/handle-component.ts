import { Content } from "../interfaces/content";
import { ComponentHandler } from "../interfaces/component-handler";
import { ContentConfig } from "../interfaces/adapter-config";

export const handleComponent: ComponentHandler = (content: Content, contentConfig: ContentConfig): Content => {
    if(!content || !contentConfig) {
        throw new Error('Input is invalid.');
    }
    return iterateThroughObject(content, contentConfig);
};

export const iterateThroughObject = (input: Content, contentConfig: ContentConfig): Content => {
    let output: Content = {
        type: '',
        data: {}
    };
    if(typeof input.data === 'object') {
        Object.keys(input.data).forEach(key => { 
            output.data[key] = iterateThroughObject(input.data[key], contentConfig);
        });
    }
    else if (Array.isArray(input.data)) {
        output.data = input.data.forEach(dataParameter => {
            iterateThroughObject(dataParameter, contentConfig);
        });
    }
    else {
        output = JSON.parse(JSON.stringify(input));
    }
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