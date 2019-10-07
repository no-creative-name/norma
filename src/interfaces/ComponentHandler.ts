import { Content, NormalizedContent } from "./Content";
import { ComponentConfig } from "./AdapterConfig";

export type ComponentHandler = (content: Content, componentConfig: ComponentConfig) => NormalizedContent;
