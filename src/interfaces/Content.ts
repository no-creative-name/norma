export interface Content {
  type: string;
  data: ContentData;
}

interface ContentData {
  [key: string]: any;
}