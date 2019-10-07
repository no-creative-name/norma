import { Content } from "./Content";
import { ComponentConfig } from "./AdapterConfig";

export type ComponentHandler = (content: Content, componentConfig: ComponentConfig) => Content;
