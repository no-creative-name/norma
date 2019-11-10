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

    let handledContent = Object.assign({}, content);

    if (contentConfigs) {
        contentConfigs.forEach((contentConfig) => {
            handledContent = adjustContentToContentConfig(handledContent, contentConfig);
        });
    }

    let handledContent2 = Object.assign({}, handledContent);

    if (fieldConfigs) {
        fieldConfigs.forEach((fieldConfig) => {
            handledContent2 = adjustContentToFieldConfig(handledContent2, fieldConfig);
        });
    }

    return handledContent;
};
