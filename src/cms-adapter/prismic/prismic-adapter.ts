import { CmsAdapter } from "../interfaces/cms-adapter";
import * as Prismic from 'prismic-javascript'
import { Content } from "../../interfaces/contents";
import { PrismicConfig } from "./interfaces/prismic-config";
import { PrismicData } from "./interfaces/prismic-data";
import { normalizePrismicData } from "./helpers/normalize-prismic-data";

export class PrismicAdapter implements CmsAdapter {
    private client;

    constructor(config: PrismicConfig) {
        if(!config) {
            throw new Error('Creation of cms adapter failed: config is undefined');
        }
        this.client = Prismic.api(config.endpoint);
    }

    public async getNormalizedContentData (contentId: string, locale: string): Promise<Content> {
        const api = await this.client;
        let res: PrismicData = await api.getByID(contentId);
        
        if(res.lang !== locale) {
            const altLang = res.alternate_languages.find(altLang => altLang.lang === locale);
            if(altLang) {
                res = await api.getByID(altLang.id);
            }
        }

        return normalizePrismicData(res, api);
    }
}