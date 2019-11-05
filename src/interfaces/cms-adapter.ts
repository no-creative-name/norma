import { IContent } from "./content";

export interface ICmsAdapter {
    getNormalizedContentData: (contentId: string, locale: string) => Promise<IContent>;
}
