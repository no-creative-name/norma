export interface AdapterConfig {
    cms: CMSConfig;
    contents?: ContentConfig[];
}

interface CMSConfig {
    type: string;
    credentials: any;
}

export interface ContentConfig {
    inputType: string;
    outputType?: string;
    propertyAdjustments?: PropertyConfig[];
}

interface PropertyConfig {
    inputIdentifier?: string | string[];
    outputIdentifier?: string | string[];
    valueConverter?: ValueConverter;
}

type ValueConverter = (value: any) => any;
