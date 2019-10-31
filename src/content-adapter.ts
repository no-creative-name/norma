import { CmsAdapter } from "./cms-adapter/interfaces/cms-adapter";
import { ContentConfig, AdapterConfig } from "./interfaces/adapter-config";
import { Content } from "./interfaces/content";
import { handleContent } from "./handle-content/handle-content";
import { getCmsAdapter } from "./cms-adapter/get-cms-adapter";

export class ContentAdapter {
    private cmsAdapter: CmsAdapter;
    private adapterConfig: AdapterConfig;

    constructor(adapterConfig: AdapterConfig) {
        if(!adapterConfig) {
            throw new Error(`Creation of content adapter failed: adapter config is undefined`);
        }
        this.cmsAdapter = getCmsAdapter(adapterConfig.cms.type, adapterConfig.cms.credentials);
        this.adapterConfig = adapterConfig;
    }

    public async getContent (contentId: string, locale: string): Promise<Content> {
        if(!contentId) {
            throw new Error(`Couldn't get content: content id is undefined`);
        }
        if(!locale) {
            throw new Error(`Couldn't get content: locale is undefined`);
        }
        const content = await this.cmsAdapter.getNormalizedContentData(contentId, locale);
        const handledContent = this.adapterConfig.contents ? handleContent(content, this.adapterConfig.contents): content;
        return handledContent;
    }

}