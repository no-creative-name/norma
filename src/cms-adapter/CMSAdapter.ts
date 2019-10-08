import { Content } from '../interfaces/Content';

export interface CMSAdapter {
    getDataForContentId: (contentId: string | number) => Promise<Content>
}
