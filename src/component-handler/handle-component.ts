import { Content } from "../interfaces/content";
import { ComponentHandler } from "../interfaces/component-handler";
import { ComponentConfig } from "../interfaces/adapter-config";

export const handleComponent: ComponentHandler = (content: Content, componentConfig: ComponentConfig) => {
    if(!content || !componentConfig) {
        throw new Error('Input is invalid.');
    }
    return undefined;
};
