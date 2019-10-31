import { IContent } from "../../interfaces/content";

export interface ICmsAdapter {
    getNormalizedContentData: (contentId: string, locale: string) => Promise<IContent>;
}
