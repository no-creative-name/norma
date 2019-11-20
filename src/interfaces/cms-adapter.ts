import { IContent } from "./content";

export interface ICmsAdapter {
    supportsFieldTypeWiseAdjustment: boolean;
    getNormalizedContentData: (contentId: string, locale: string) => Promise<IContent>;
}
