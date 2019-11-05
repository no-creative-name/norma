import { handleContent } from "./handle-content/handle-content";
import { IContentConfig } from "./interfaces/adapter-config";
import { ICmsAdapter } from "./interfaces/cms-adapter";
import { IContent } from "./interfaces/content";

export class ContentAdapter {
    private cmsAdapter: ICmsAdapter;
    private contentConfig: IContentConfig[];

    constructor(cmsAdapter: ICmsAdapter, contentConfig?: IContentConfig[]) {
        if (!cmsAdapter) {
            throw new Error(`Creation of content adapter failed: adapter is undefined`);
        }
        this.cmsAdapter = cmsAdapter;
        this.contentConfig = contentConfig;
    }

    public async getContent(contentId: string, locale: string): Promise<IContent> {
        if (!contentId) {
            throw new Error(`Couldn't get content: content id is undefined`);
        }
        if (!locale) {
            throw new Error(`Couldn't get content: locale is undefined`);
        }
        const content = await this.cmsAdapter.getNormalizedContentData(contentId, locale);
        const handledContent = this.contentConfig ?
            handleContent(content, this.contentConfig) :
            content;
        return handledContent;
    }

}
