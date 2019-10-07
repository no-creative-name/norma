export interface AdapterConfig {
    cms: CMSConfig;
    components: ComponentConfig[]; 
}

interface CMSConfig {
    type: string;
    endpoint: string;
    credentials: any;
}

export interface ComponentConfig {
    name: string;
    parameterAdjustments?: ParameterConfig[];
}

interface ParameterConfig {
    inputIdentifier?: string[];
    outputIdentifier?: string[];
    valueConverter?: ValueConverter;
}

type ValueConverter = (value: any) => any;