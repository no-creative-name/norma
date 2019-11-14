import { IContentConfig, IFieldConfig } from "../interfaces/adapter-config";
import { IContent } from "../interfaces/content";

export type ContentHandler = (
    content: IContent,
    contentConfigs?: IContentConfig[],
    fieldConfigs?: IFieldConfig[],
    supportsFieldWiseAdjustment?: boolean,
) => IContent;
