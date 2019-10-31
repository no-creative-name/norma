export interface IAdapterConfig {
    cms: ICMSConfig;
    contents?: IContentConfig[];
}

interface ICMSConfig {
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
