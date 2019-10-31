import { adapterConfig } from "../adapter.config";
import { getCmsAdapter } from "./cms-adapter/get-cms-adapter";
import { ContentAdapter } from "./content-adapter";

window.onload = async () => {
    const contentAdapter = new ContentAdapter(adapterConfig);

    // tslint:disable-next-line
    console.log(await contentAdapter.getContent("XbGTUBIAACkA2IQ3", "de-de"));
};
