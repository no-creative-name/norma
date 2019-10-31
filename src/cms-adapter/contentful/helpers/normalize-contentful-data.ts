import { Entry } from "contentful";
import { IContent } from "../../../interfaces/content";

export const normalizeContentfulData = (
    rawContentData: Entry<unknown>,
    alreadyNormalizedContents: any = {},
): IContent => {
    if (!rawContentData) {
        throw new Error("Normalization of contentful data failed: input undefined");
    }

    alreadyNormalizedContents[rawContentData.sys.id] = {};

    const normalizedContent: IContent = {
        data: {},
        id: rawContentData.sys.id,
        type: rawContentData.sys.contentType ? rawContentData.sys.contentType.sys.id : rawContentData.sys.type,
    };

    Object.keys(rawContentData.fields).forEach((fieldIdentifier) => {
        const contentField = rawContentData.fields[fieldIdentifier];
        if (Array.isArray(contentField)) {
            const normalizedSubField = [];
            contentField.forEach((subField) => {
                if (subField.fields && subField.sys) {
                    normalizedSubField.push(normalizeContentfulData(subField, alreadyNormalizedContents));
                } else {
                    normalizedSubField.push(subField);
                }
            });
            normalizedContent.data[fieldIdentifier] = normalizedSubField;
        } else {
            if (contentField.fields && contentField.sys) {
                normalizedContent.data[fieldIdentifier] =
                    alreadyNormalizedContents[contentField.sys.id] ||
                    normalizeContentfulData(contentField, alreadyNormalizedContents);
            } else {
                normalizedContent.data[fieldIdentifier] = contentField;
            }
        }
    });

    alreadyNormalizedContents[rawContentData.sys.id].data = normalizedContent.data;
    alreadyNormalizedContents[rawContentData.sys.id].type = normalizedContent.type;
    alreadyNormalizedContents[rawContentData.sys.id].id = normalizedContent.id;

    return normalizedContent;
};
