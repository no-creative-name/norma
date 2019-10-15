import { adapterNameByCmsType } from "./adapter-name-by-cms-type"

export const getCmsAdapter = (type: string, config: any) => {
    if(!type) {
        throw new Error('Creation of cms adapter failed: type is undefined');
    }
    if(!config) {
        throw new Error('Creation of cms adapter failed: config is undefined');
    }
    if(!adapterNameByCmsType[type]) {
        throw new Error('Creation of cms adapter failed: cms type is unknown');
    }
    return new adapterNameByCmsType[type](config);

}