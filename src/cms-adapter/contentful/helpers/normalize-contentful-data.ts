import { Entry } from "contentful";
import { Content } from "../../../interfaces/content";

export const normalizeContentfulData = (rawContentData: Entry<unknown>): Content => {
    console.log(rawContentData);
    
    if(!rawContentData) {
        throw new Error('Normalization of contentful data failed: input undefined')
    }
    let normalizedContent = {
        type: rawContentData.sys.contentType ? rawContentData.sys.contentType.sys.id : rawContentData.sys.type,
        data: {}
    };
    Object.keys(rawContentData.fields).forEach((fieldIdentifier) => {
        const contentField = rawContentData.fields[fieldIdentifier];
        if(Array.isArray(contentField)) {
            const normalizedSubField = [];
            contentField.forEach((subField) => {
                if(subField.fields && subField.sys) {
                    normalizedSubField.push(normalizeContentfulData(subField));
                }
                else {
                    normalizedSubField.push(subField);
                }
            });
            normalizedContent.data[fieldIdentifier] = normalizedSubField;
        }
        else {
            if(contentField.fields && contentField.sys) {
                normalizedContent.data[fieldIdentifier] = normalizeContentfulData(contentField);
            }
            else {
                normalizedContent.data[fieldIdentifier] = contentField;
            }
        }
    });
    
    return normalizedContent;
}