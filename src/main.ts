import { getCmsAdapter } from "./cms-adapter/get-cms-adapter"
import { adapterConfig } from "../adapter.config";
import { getContent } from "./get-content";

window.onload = async () => {
    const cmsAdapter = getCmsAdapter(adapterConfig.cms.type, adapterConfig.cms.credentials);
    
    console.log(await getContent('44eh1S0IXmC0LeMciK6z6t', 'en-US', cmsAdapter, adapterConfig.contents));
}