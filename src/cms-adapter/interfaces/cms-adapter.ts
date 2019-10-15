import { Content } from '../../interfaces/content';

export interface CMSAdapter {
    getNormalizedContentData: (contentId: string, locale: string) => Promise<Content>
}