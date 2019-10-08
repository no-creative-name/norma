import { AdapterConfig } from "./src/interfaces/adapter-config";

export const adapterConfig: AdapterConfig = {
    cms: {
        type: 'GraphCMS',
        endpoint: 'endpoint.com/asdf',
        credentials: {}
    },
    components: [{
        name: 'accordion',
        parameterAdjustments: [
            {
                inputIdentifier: ['title'],
                outputIdentifier: ['headline', 'title'],
                valueConverter: (value) => {
                    return value.padStart(1);
                }
            }
        ]
    }], 
}