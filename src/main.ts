import "@babel/polyfill";
import { IAdapterConfig } from "headless-cms-adapter/interfaces/adapter-config";
import merge = require("lodash.merge");
import { adapterConfig } from "./adapter-config";
import { ContentAdapter } from "./content-adapter";

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
    console.log(await getContentAdapter(adapterConfig).getContent("44eh1S0IXmC0LeMciK6z6t", "de"));
};
