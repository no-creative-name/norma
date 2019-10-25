import { getCmsAdapter } from "./cms-adapter/get-cms-adapter"
import { adapterConfig } from "../adapter.config";
import { ContentAdapter } from "./content-adapter";

window.onload = async () => {
    const cmsAdapter = getCmsAdapter(adapterConfig.cms.type, adapterConfig.cms.credentials);
    const contentAdapter = new ContentAdapter(cmsAdapter, adapterConfig.contents);
    
    console.log(await contentAdapter.getContent('XbK69BIAACEAt2GT', 'de-de'));
}