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
        inputType: 'page',
        outputType: 'site',
        parameterAdjustments: [
            {
                inputIdentifier: ['mainNavigation'],
                outputIdentifier: ['subfolder', 'level2', 'content'],
                valueConverter: (value) => {
                    return value.padStart(1);
                }
            }
        ]
    }], 
}