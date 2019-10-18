import { Content } from "./content";
import { ContentConfig } from "./adapter-config";

export type ContentHandler = (content: Content, contentConfig: ContentConfig[]) => Content;
