import { IContentConfig } from "../interfaces/adapter-config";
import { IContent } from "../interfaces/content";

export type ContentHandler = (content: IContent, contentConfig: IContentConfig[]) => IContent;
