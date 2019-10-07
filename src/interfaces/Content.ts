export interface Content {
  data: any;
  metaData: MetaData;
  children?: Content[];
}
interface MetaData {
  componentName: string;
}