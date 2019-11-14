import { IContent } from "./content";

export interface ICmsAdapter {
    supportsFieldWiseAdjustment: boolean;
    getNormalizedContentData: (contentId: string, locale: string) => Promise<IContent>;
}
