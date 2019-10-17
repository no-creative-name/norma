import { Entry } from "contentful";
import { Content } from "../../../interfaces/content";

export const normalizeContentfulData = (rawContentData: Entry<unknown>, alreadyNormalizedContents: any = {}): Content => {
    if(!rawContentData) {
        throw new Error('Normalization of contentful data failed: input undefined')
    }

    alreadyNormalizedContents[rawContentData.sys.id] = {};

    const normalizedContent = {
        type: rawContentData.sys.contentType ? rawContentData.sys.contentType.sys.id : rawContentData.sys.type,
        data: {}
    };

    Object.keys(rawContentData.fields).forEach((fieldIdentifier) => {
        const contentField = rawContentData.fields[fieldIdentifier];
        if(Array.isArray(contentField)) {
            const normalizedSubField = [];
            contentField.forEach((subField) => {
                if(subField.fields && subField.sys) {
                    normalizedSubField.push(normalizeContentfulData(subField, alreadyNormalizedContents));
                }
                else {
                    normalizedSubField.push(subField);
                }
            });
            normalizedContent.data[fieldIdentifier] = normalizedSubField;
        }
        else {
            if(contentField.fields && contentField.sys) {
                normalizedContent.data[fieldIdentifier] = alreadyNormalizedContents[contentField.sys.id] || normalizeContentfulData(contentField, alreadyNormalizedContents);
            }
            else {
                normalizedContent.data[fieldIdentifier] = contentField;
            }
        }
    });
    alreadyNormalizedContents[rawContentData.sys.id] = normalizedContent;
    
    return normalizedContent;
}