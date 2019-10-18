import { getCmsAdapter } from "./cms-adapter/get-cms-adapter"
import { adapterConfig } from "../adapter.config";
import { handleContent } from "./handle-content/handle-content";

window.onload = async () => {
    const cmsAdapter = getCmsAdapter(adapterConfig.cms.type, adapterConfig.cms.credentials);
    const content = await cmsAdapter.getNormalizedContentData('44eh1S0IXmC0LeMciK6z6t', 'en-US');
    const handledContent = handleContent(content, adapterConfig.contents);
    
    console.log(content, handledContent);
}