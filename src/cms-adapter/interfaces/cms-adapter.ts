import { Content } from "../../interfaces/content";

export interface CmsAdapter {
    getNormalizedContentData: (contentId: string, locale: string) => Promise<Content>;
}
