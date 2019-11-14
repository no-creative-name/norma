import _ from "lodash";
import { IContentConfig, IFieldConfig } from "../interfaces/adapter-config";
import { IContent } from "../interfaces/content";
import { adjustContentToContentConfig } from "./adjust-content-to-content-config";
import { adjustContentToFieldConfig } from "./adjust-content-to-field-config";
import { resolveContent } from "./resolve-content";

export const handleContent = (
    content: IContent,
    contentConfigs: IContentConfig[] = undefined,
    fieldConfigs: IFieldConfig[] = undefined,
): IContent => {
    if (!content) {
        throw new ReferenceError("Couldn't handle content: Input content is undefined.");
    }
    let handledContent = _.cloneDeep(content);

    if (fieldConfigs) {
        fieldConfigs.map((fieldConfig) => {
            handledContent = adjustContentToFieldConfig(handledContent, fieldConfig);
        });
    }
    handledContent = resolveContent(handledContent);

    if (contentConfigs) {
        contentConfigs.map((contentConfig) => {
            handledContent = adjustContentToContentConfig(handledContent, contentConfig);
        });
    }

    return handledContent;
};
