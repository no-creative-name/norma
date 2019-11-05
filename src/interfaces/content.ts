export interface IContent {
  type: string;
  data: IContentData;
  id: string;
}

interface IContentData {
  [key: string]: any;
}
