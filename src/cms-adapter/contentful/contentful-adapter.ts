import * as contentful from "contentful";
import { CmsAdapter } from "../interfaces/cms-adapter";
import { normalizeContentfulData } from "./helpers/normalize-contentful-data";
import { ContentfulConfig } from "./interfaces/contentful-config";

export class ContentfulAdapter implements CmsAdapter {
    private client: contentful.ContentfulClientApi;

    constructor(config: ContentfulConfig) {
        if (!config) {
            throw new Error("Creation of cms adapter failed: config is undefined");
        }
        this.createContentfulClient(config);
    }

    public async getNormalizedContentData(contentId: string, locale: string) {
        return this.fetchContentData(contentId, locale)
            .then((rawContentData) => {
                return normalizeContentfulData(rawContentData);
            }).catch((e: Error) => {
                throw e;
            });
    }

    private createContentfulClient(config: ContentfulConfig) {
        this.client = contentful.createClient({...config});
    }

    private async fetchContentData(contentId: string, locale: string) {
        return this.client.getEntry(contentId, {locale, include: 10}).catch((e: Error) => {
            throw new Error(`${this.constructor.name} could not fetch data for contentId ${contentId}. ${e.message}`);
        });
    }
}
