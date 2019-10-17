import { Content } from "./content";
import { ComponentConfig } from "./adapter-config";

export type ComponentHandler = (content: Content, componentConfig: ComponentConfig) => Content;
