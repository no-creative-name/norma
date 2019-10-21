import { Content } from "./interfaces/content";
import { CmsAdapter } from "./cms-adapter/interfaces/cms-adapter";
import { handleContent } from "./handle-content/handle-content";
import { ContentConfig } from "./interfaces/adapter-config";

export const getContent = async (contentId: string, locale: string, cmsAdapter: CmsAdapter, contentsConfig?: ContentConfig[]): Promise<Content> => {
    if(!contentId) {
        throw new Error(`Couldn't get content: content id is undefined`);
    }
    if(!locale) {
        throw new Error(`Couldn't get content: locale is undefined`);
    }
    const content = await cmsAdapter.getNormalizedContentData(contentId, locale);
    const handledContent = contentsConfig ? handleContent(content, contentsConfig): content;
    return handledContent;
}