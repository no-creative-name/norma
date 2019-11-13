import { IContentConfig, IFieldConfig } from "../interfaces/adapter-config";
import { IContent } from "../interfaces/content";
import { adjustContentToContentConfig } from "./adjust-content-to-content-config";
import { adjustContentToFieldConfig } from "./adjust-content-to-field-config";
import { ContentHandler } from "./content-handler";

export const handleContent: ContentHandler = (
    content: IContent,
    contentConfigs: IContentConfig[] = undefined,
    fieldConfigs: IFieldConfig[] = undefined,
): IContent => {
    if (!content) {
        throw new ReferenceError("Couldn't handle content: Input content is undefined.");
    }
    console.log(content);
    
    const _ = require("lodash");

    let handledContent = _.cloneDeep(content);

    if (fieldConfigs) {
        const handledResults = fieldConfigs.map((fieldConfig) => {
            console.log(fieldConfig);
            
            return adjustContentToFieldConfig(handledContent, fieldConfig);
        });
        console.log(handledResults);
        handledContent = _.merge(...handledResults);
    }

    if (contentConfigs) {
        contentConfigs.map((contentConfig) => {
            handledContent = adjustContentToContentConfig(handledContent, contentConfig);
        });
    }

    return handledContent;
};
