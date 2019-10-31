export interface Content {
  type: string;
  data: ContentData;
  id?: string;
}

interface ContentData {
  [key: string]: any;
}
