import { handleContent } from "./handle-content/handle-content";
import { IContentConfig, IFieldConfig } from "./interfaces/adapter-config";
import { ICmsAdapter } from "./interfaces/cms-adapter";
import { IContent } from "./interfaces/content";

export class ContentAdapter {
    private cmsAdapter: ICmsAdapter;
    private contentConfigs: IContentConfig[];
    private fieldConfigs: IFieldConfig[];

    constructor(cmsAdapter: ICmsAdapter, contentConfigs?: IContentConfig[], fieldConfigs?: IFieldConfig[]) {
        if (!cmsAdapter) {
            throw new ReferenceError(`Creation of content adapter failed: adapter is undefined`);
        }
        this.cmsAdapter = cmsAdapter;
        this.contentConfigs = contentConfigs;
        this.fieldConfigs = fieldConfigs;
        if (!cmsAdapter.supportsFieldTypeWiseAdjustment && fieldConfigs) {
            throw new Error(`Selected CMS connection module doesn't support field-wise adjustments yet. Please don't input this config.`);
        }
    }

    public async getContent(contentId: string, locale: string): Promise<IContent> {
        if (!contentId) {
            throw new ReferenceError(`Couldn't get content: content id is undefined`);
        }
        if (!locale) {
            throw new ReferenceError(`Couldn't get content: locale is undefined`);
        }
        const content = await this.cmsAdapter.getNormalizedContentData(contentId, locale);
        const handledContent = handleContent(
            content,
            this.contentConfigs,
            this.fieldConfigs,
        );

        return handledContent;
    }
}
