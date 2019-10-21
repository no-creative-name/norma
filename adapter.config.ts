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
        propertyAdjustments: [
            {
                inputIdentifier: ['mainNavigation'],
                outputIdentifier: ['subfolder', 'level2', 'content'],
                valueConverter: (value) => {
                    return JSON.stringify(value);
                }
            },
            {
                inputIdentifier: ['title'],
                valueConverter: (value) => {
                    return `wooooop ${value}`;
                }
            }
        ]
    }], 
}