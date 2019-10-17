import { getCmsAdapter } from "./cms-adapter/get-cms-adapter"
import { adapterConfig } from "../adapter.config";

window.onload = async () => {
    const cmsAdapter = getCmsAdapter(adapterConfig.cms.type, adapterConfig.cms.credentials);
    const content = await cmsAdapter.getNormalizedContentData('3DqQa1gtCoX0VqDKRxKCMX', 'en-US');
    console.log(content);
}