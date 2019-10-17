import { AdapterConfig } from "./src/interfaces/adapter-config";

export const adapterConfig: AdapterConfig = {
    cms: {
        type: 'contentful',
        credentials: {
            space: "zjrd7s7o2cec",
            accessToken:"llgJXPycQ8ey-VF-piNoqwinwOjgnX6DN44TmElwtXE"
        }
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