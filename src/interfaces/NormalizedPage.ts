import { Content } from "./Content";

export interface NormalizedPage {
  title: string;
  breadcrumb?: string;
  children: Content[];
}
