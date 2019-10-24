import { CmsAdapter } from "./cms-adapter/interfaces/cms-adapter";
import { ContentConfig } from "./interfaces/adapter-config";
import { Content } from "./interfaces/contents";

export class ContentAdapter {
    private cmsAdapter;
    private contentConfigs;

    constructor(cmsAdapter: CmsAdapter, contentConfigs?: ContentConfig[]) {
        if(!cmsAdapter) {
            throw new Error(`Creation of content adapter failed: cms adapter is undefined`);
        }
        this.cmsAdapter = cmsAdapter;
        this.contentConfigs = contentConfigs || null;
    }

    public async getContent (contentId: string, locale: string): Promise<Content> {
        if(!contentId) {
            throw new Error(`Couldn't get content: content id is undefined`);
        }
        if(!locale) {
            throw new Error(`Couldn't get content: locale is undefined`);
        }
        const content = await this.cmsAdapter.getNormalizedContentData(contentId, locale);
        //const handledContent = this.contentConfigs ? handleContent(content, this.contentConfigs): content;
        return content;
    }

}