import { Content } from "../../../interfaces/content";
import { PrismicData } from "../interfaces/prismic-data";
import ResolvedApi from "prismic-javascript/d.ts/ResolvedApi";

export const normalizePrismicData = async (rawContentData: PrismicData, api: ResolvedApi, alreadyNormalizedContents: any = {}): Promise<Content> => {
    if(!rawContentData) {
        throw new Error('Normalization of contentful data failed: input undefined')
    }

    const normalizedContent: Content = {
        type: rawContentData.type,
        data: {}
    };

    // iterate over fields under data
    for(const fieldIdentifier of Object.keys(rawContentData.data)) {
        const contentField = rawContentData.data[fieldIdentifier];

        // if field is array...
        if(Array.isArray(contentField)) {
            const normalizedSubField = [];

            // ...iterate over array entries
            for(const subField of contentField) {

                /*// if entry is array...
                if(Array.isArray(subField)) {
                    console.log(subField);
                    

                    // ...iterate over array entries
                    for(const subSubField of subField) {
                        const subContent = subSubField;
                        if(subContent.id) {
                            const subContentData = alreadyNormalizedContents[subContent.id] || await api.getByID(subContent.id).then(res => normalizePrismicData((res as any), api, alreadyNormalizedContents));
                            normalizedSubField.push({type: subContent.type, data: subContentData.data});
                        }
                        else {
                            normalizedSubField.push(subField);
                        }
                    }
                } else {*/
                    if(subField.type && subField.id) {
                        const subContentData = alreadyNormalizedContents[subField.id] || await api.getByID(subField.id).then(res => normalizePrismicData((res as any), api, alreadyNormalizedContents));
                        normalizedSubField.push({type: subField.type, data: subContentData.data});
                    }
                    else if(subField[Object.keys(subField)[0]]) {
                        const subContent = subField[Object.keys(subField)[0]];

                        if(subContent.id) {
                            const subContentData = alreadyNormalizedContents[subContent.id] || await api.getByID(subContent.id).then(res => normalizePrismicData((res as any), api, alreadyNormalizedContents));
                            normalizedSubField.push({type: subContent.type, data: subContentData.data});
                        }
                        else {
                            normalizedSubField.push(subField);
                        }
                    }
               /* }*/
            }
            normalizedContent.data[fieldIdentifier] = normalizedSubField;
            alreadyNormalizedContents[rawContentData.id] = normalizedContent;
        }
        else {
            if(contentField.id && contentField.type) {
                const contentFieldData = alreadyNormalizedContents[contentField.id] || await api.getByID(contentField.id).then(res => normalizePrismicData((res as any), api, alreadyNormalizedContents));
                normalizedContent.data[fieldIdentifier] = {type: contentField.type, data: contentFieldData.data};
            }
            else {
                normalizedContent.data[fieldIdentifier] = contentField;
            }
            alreadyNormalizedContents[rawContentData.id] = normalizedContent;
        }
    }

    return normalizedContent;
}