import * as Prismic from "prismic-javascript";
import { IContent } from "../../interfaces/content";
import { ICmsAdapter } from "../interfaces/cms-adapter";
import { normalizePrismicData } from "./helpers/normalize-prismic-data";
import { IPrismicConfig } from "./interfaces/prismic-config";
import { IPrismicData } from "./interfaces/prismic-data";

export class PrismicAdapter implements ICmsAdapter {
    private client;

    constructor(config: IPrismicConfig) {
        if (!config) {
            throw new Error("Creation of cms adapter failed: config is undefined");
        }
        this.client = Prismic.api(config.endpoint);
    }

    public async getNormalizedContentData(contentId: string, locale: string) {
        const api = await this.client;
        let res: IPrismicData = await api.getByID(contentId);

        if (res.lang !== locale) {
            const altLang = res.alternate_languages.find((alternateLang) => alternateLang.lang === locale);
            if (altLang) {
                res = await api.getByID(altLang.id);
            }
        }

        return normalizePrismicData(res, api);
    }
}
