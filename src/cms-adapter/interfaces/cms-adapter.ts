import { Content } from '../../interfaces/contents';

export interface CmsAdapter {
    getNormalizedContentData: (contentId: string, locale: string) => Promise<Content>
}