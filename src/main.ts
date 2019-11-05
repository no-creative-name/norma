import "@babel/polyfill";
import merge = require("lodash.merge");
import { adapterConfig } from "./adapter-config";
import { ContentAdapter } from "./content-adapter";
import { IAdapterConfig } from "./interfaces/adapter-config";

let contentAdapter: ContentAdapter;

export const getContentAdapter = (customAdapterConfig: IAdapterConfig): ContentAdapter => {
    if (customAdapterConfig) {
        merge(adapterConfig, customAdapterConfig);
    }
    if (!contentAdapter) {
        contentAdapter = new ContentAdapter(adapterConfig);
    }
    return contentAdapter;
};

window.onload = async () => {
    console.log(await getContentAdapter(adapterConfig).getContent("XbGTUBIAACkA2IQ3", "de-de"));
};
