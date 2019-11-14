export interface IContent {
  type: string;
  data: IContentData;
  id: string;
}

export interface IContentResolved {
  type: string;
  data: IContentDataResolved;
  id: string;
}

export interface IContentData {
  [key: string]: {
    value: any;
    fieldType?: string;
  };
}

export interface IContentDataResolved {
  [key: string]: any;
}
