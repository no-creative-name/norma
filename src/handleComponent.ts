import { Content } from "./interfaces/Content";
import { ComponentHandler } from "./interfaces/ComponentHandler";
import { ComponentConfig } from "./interfaces/AdapterConfig";

export const handleComponent: ComponentHandler = (content: Content, componentConfig: ComponentConfig) => {
    if(!content || !componentConfig) {
        throw new Error('Input is invalid.');
    }
    return undefined;
};
