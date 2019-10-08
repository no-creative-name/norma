import { ContentfulConfig } from "./interfaces/contentful-config";
import { CMSAdapter } from '../cms-adapter';

export class ContentfulAdapter extends CMSAdapter {
    private client;

    constructor(config: any) {
        super();

        this.createContentfulClient(config);
    }

    createContentfulClient(config: ContentfulConfig) {
        const contentful = require("contentful");
        this.client = contentful.createClient(config);
    }

    fetchDataForContentId(contentId: string) {
        return this.client.getEntry(contentId);
    }
}