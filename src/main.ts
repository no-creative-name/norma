import { getCmsAdapter } from "./cms-adapter/get-cms-adapter"
import { adapterConfig } from "../adapter.config";
import { iterateThroughObject, handleComponents } from "./component-handler/handle-components";

window.onload = async () => {
    const cmsAdapter = getCmsAdapter(adapterConfig.cms.type, adapterConfig.cms.credentials);
    const content = await cmsAdapter.getNormalizedContentData('44eh1S0IXmC0LeMciK6z6t', 'en-US');
    const handledContent = handleComponents(content, adapterConfig.contents);
    
    console.log(content, handledContent);
}