import { Content } from "../interfaces/content";
import { ContentConfig } from "../interfaces/adapter-config";

export type ContentHandler = (content: Content, contentConfig: ContentConfig[]) => Content;
