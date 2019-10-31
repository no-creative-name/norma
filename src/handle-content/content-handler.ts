import { ContentConfig } from "../interfaces/adapter-config";
import { Content } from "../interfaces/content";

export type ContentHandler = (content: Content, contentConfig: ContentConfig[]) => Content;
