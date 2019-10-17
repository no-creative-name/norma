import { getCmsAdapter } from "./cms-adapter/get-cms-adapter"
import { adapterConfig } from "../adapter.config";
import { iterateThroughObject, handleComponent } from "./component-handler/handle-component";

window.onload = async () => {
    const cmsAdapter = getCmsAdapter(adapterConfig.cms.type, adapterConfig.cms.credentials);
    const content = await cmsAdapter.getNormalizedContentData('2oYGzZP3IqH1f0RxGhKGUL', 'en-US');
    let handledContent;
    adapterConfig.contents.forEach(contentConfig => {handledContent = handleComponent(content, contentConfig)});
    
    console.log(content, handledContent);
}