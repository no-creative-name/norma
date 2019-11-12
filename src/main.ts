import "@babel/polyfill";
import { ContentAdapter } from "./content-adapter";
import { IContentConfig, IFieldConfig } from "./interfaces/adapter-config";
import { ICmsAdapter } from "./interfaces/cms-adapter";

export const getContentAdapter = (
    adapter: ICmsAdapter,
    contentConfig: IContentConfig[] = undefined,
    fieldConfig: IFieldConfig[] = undefined,
): ContentAdapter => {
    if (!adapter) {
        throw new ReferenceError(`Couldn't get content adapter, cms adapter undefined.`);
    }
    return new ContentAdapter(adapter, contentConfig, fieldConfig);
};
