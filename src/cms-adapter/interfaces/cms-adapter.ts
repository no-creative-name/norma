import { Content } from '../../interfaces/content';
import { ContentfulContent } from '../contentful/interfaces/contentful-content';

export interface CMSAdapter {
    fetchDataForContentId: (contentId: string, locale: string, withChildren?: boolean) => Promise<ContentfulContent>
}