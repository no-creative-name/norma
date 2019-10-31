import * as contentful from "contentful";
import { ICmsAdapter } from "../interfaces/cms-adapter";
import { normalizeContentfulData } from "./helpers/normalize-contentful-data";
import { IContentfulConfig } from "./interfaces/contentful-config";

export class ContentfulAdapter implements ICmsAdapter {
    private client: contentful.ContentfulClientApi;

    constructor(config: IContentfulConfig) {
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

    private createContentfulClient(config: IContentfulConfig) {
        this.client = contentful.createClient({...config});
    }

    private async fetchContentData(contentId: string, locale: string): Promise<contentful.Entry<unknown>> {
        return this.client.getEntry(contentId, {locale, include: 10}).catch((e: Error) => {
            throw new Error(`${this.constructor.name} could not fetch data for contentId ${contentId}. ${e.message}`);
        });
    }
}
