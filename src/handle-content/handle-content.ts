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
        throw new Error("Couldn't handle content: Input content is undefined.");
    }
    const _ = require("lodash");

    let handledContent = Object.assign({}, content);

    if (fieldConfigs) {
        const handledResults = fieldConfigs.map((fieldConfig) => {
            return adjustContentToFieldConfig(handledContent, fieldConfig);
        });
        handledContent = _.merge(...handledResults);
    }

    if (contentConfigs) {
        const handledResults = contentConfigs.map((contentConfig) => {
            return adjustContentToContentConfig(handledContent, contentConfig);
        });
        handledContent = _.merge(...handledResults);
    }

    return handledContent;
};
