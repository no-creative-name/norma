import { IContentConfig, IFieldConfig } from "../interfaces/adapter-config";
import { IContent } from "../interfaces/content";
import { adjustContentToContentConfig } from "./adjust-content-to-content-config";
import { adjustContentToFieldConfig } from "./adjust-content-to-field-config";
import { ContentHandler } from "./content-handler";
import { resolveContent } from "./resolve-content";

export const handleContent: ContentHandler = (
    content: IContent,
    contentConfigs: IContentConfig[] = undefined,
    fieldConfigs: IFieldConfig[] = undefined,
    supportsFieldWiseAdjustment: boolean = false,
): IContent => {
    if (!content) {
        throw new ReferenceError("Couldn't handle content: Input content is undefined.");
    }
    const _ = require("lodash");

    let handledContent = _.cloneDeep(content);

    if (supportsFieldWiseAdjustment) {
        if (fieldConfigs) {
            fieldConfigs.map((fieldConfig) => {
                handledContent = adjustContentToFieldConfig(handledContent, fieldConfig);
            });
        }

        handledContent = resolveContent(handledContent);
    }

    if (contentConfigs) {
        contentConfigs.map((contentConfig) => {
            handledContent = adjustContentToContentConfig(handledContent, contentConfig);
        });
    }

    return handledContent;
};
