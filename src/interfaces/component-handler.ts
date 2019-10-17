import { Content } from "./content";
import { ContentConfig } from "./adapter-config";

export type ComponentHandler = (content: Content, contentConfig: ContentConfig[]) => Content;
