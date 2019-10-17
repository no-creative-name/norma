export interface AdapterConfig {
    cms: CMSConfig;
    contents: ContentConfig[]; 
}

interface CMSConfig {
    type: string;
    credentials: any;
}

export interface ContentConfig {
    inputType: string;
    outputType?: string;
    parameterAdjustments?: ParameterConfig[];
}

interface ParameterConfig {
    inputIdentifier?: string | string[];
    outputIdentifier?: string | string[];
    valueConverter?: ValueConverter;
}

type ValueConverter = (value: any) => any;