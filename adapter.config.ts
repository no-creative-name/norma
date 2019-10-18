import { AdapterConfig } from "./src/interfaces/adapter-config";

export const adapterConfig: AdapterConfig = {
    cms: {
        type: 'contentful',
        credentials: {
            space: "zjrd7s7o2cec",
            accessToken:"llgJXPycQ8ey-VF-piNoqwinwOjgnX6DN44TmElwtXE"
        }
    },
    contents: [{
        inputType: 'leadText',
        outputType: 'carousel',
        parameterAdjustments: [
            {
                inputIdentifier: ['headline'],
                outputIdentifier: ['headline', 'title'],
                valueConverter: (value) => {
                    return value.padStart(1);
                }
            }
        ]
    },{
        inputType: 'page',
        outputType: 'superSection'
    }], 
}