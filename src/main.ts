import "@babel/polyfill";
import { ContentAdapter } from "./content-adapter";
import { IAdapterConfig } from "./interfaces/adapter-config";

export const getContentAdapter = (adapterConfig: IAdapterConfig): ContentAdapter => {
    if (!adapterConfig) {
        throw new Error(`Couldn't get content adapter: Adapter config is undefined.`);
    }
    return new ContentAdapter(adapterConfig);
};
