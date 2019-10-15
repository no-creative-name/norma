import { ContentfulConfig } from "./interfaces/contentful-config";
import { CMSAdapter } from '../interfaces/cms-adapter';
import * as contentful from 'contentful';

export class ContentfulAdapter implements CMSAdapter {
    private client: contentful.ContentfulClientApi;

    constructor(config: ContentfulConfig) {
        if(!config) {
            throw new Error('Creation of cms adapter failed: config is undefined');
        }
        this.createContentfulClient(config);
    }

    private createContentfulClient(config: ContentfulConfig) {
        this.client = contentful.createClient(config);
    }

    public async getNormalizedContentData(contentId: string, locale: string) {
        return this.fetchContentData(contentId, locale)
            .then(rawContentData => {
                return {
                    componentName: rawContentData.sys.contentType.sys.id,
                    data: rawContentData.fields
                }
            });
    }

    private async fetchContentData(contentId: string, locale: string) {
        return this.client.getEntry(contentId, {locale}).catch((e) => {
            throw new Error(`${this.constructor.name} could not fetch data for contentId ${contentId}`);
        });
    }
}