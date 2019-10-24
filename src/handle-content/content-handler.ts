import { Content } from "../interfaces/contents";
import { ContentConfig } from "../interfaces/adapter-config";

export type ContentHandler = (content: Content, contentConfig: ContentConfig[]) => Content;
