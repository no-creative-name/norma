export interface IAdapterConfig {
    cms: ICmsConfig;
    contents?: IContentConfig[];
}

export interface ICmsConfig {
    type: string;
    credentials: any;
}

export interface IContentConfig {
    inputType: string;
    outputType?: string;
    propertyAdjustments?: IPropertyConfig[];
}

interface IPropertyConfig {
    inputIdentifier?: string | string[];
    outputIdentifier?: string | string[];
    valueConverter?: ValueConverter;
}

type ValueConverter = (value: any) => any;
