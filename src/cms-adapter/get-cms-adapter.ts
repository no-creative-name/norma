import { adapterNameByCmsType } from "./adapter-name-by-cms-type";
import { ICmsAdapter } from "./interfaces/cms-adapter";

export const getCmsAdapter = (type: string, config: any): ICmsAdapter => {
    if (!type) {
        throw new Error("Creation of cms adapter failed: type is undefined");
    }
    if (!config) {
        throw new Error("Creation of cms adapter failed: config is undefined");
    }
    if (!adapterNameByCmsType[type]) {
        throw new Error("Creation of cms adapter failed: cms type is unknown");
    }
    return new adapterNameByCmsType[type](config);

};
