import { Content } from '../../interfaces/content';

export interface CMSAdapter {
    fetchDataForContentId: (contentId: string, locale: string, withChildren?: boolean) => Promise<Content>
}