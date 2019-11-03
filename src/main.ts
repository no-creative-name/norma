import { adapterConfig } from "./adapter.config";
import { ContentAdapter } from "./content-adapter";

let contentAdapter: ContentAdapter;

export const getContentAdapter = (): ContentAdapter => {
    if (!contentAdapter) {
        contentAdapter = new ContentAdapter(adapterConfig);
    }
    return contentAdapter;
};

module.exports.getContentAdapter = getContentAdapter;

/*window.onload = async () => {
    contentAdapter = new ContentAdapter(adapterConfig);

    // tslint:disable-next-line
    console.log(await contentAdapter.getContent("44eh1S0IXmC0LeMciK6z6t", "de"));
};*/
