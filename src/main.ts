import "@babel/polyfill";
import { ICmsAdapter } from "./cms-adapter/interfaces/cms-adapter";
import { ContentAdapter } from "./content-adapter";
import { IContentConfig } from "./interfaces/adapter-config";

export const getContentAdapter = (adapter: ICmsAdapter, contentConfig?: IContentConfig[]): ContentAdapter => {
    if (!adapter) {
        throw new Error(`Couldn't get content adapter, cms adapter undefined.`);
    }
    return new ContentAdapter(adapter, contentConfig);
};
