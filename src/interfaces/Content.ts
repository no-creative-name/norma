export interface Content {
  data: any;
  metaData: MetaData;
  children: Content[];
}

export interface NormalizedContent extends Content {
  metaData: NormalizedMetaData;
}

interface MetaData {
  componentName: string;
}

interface NormalizedMetaData extends MetaData {
  fileUrl: string;
}
