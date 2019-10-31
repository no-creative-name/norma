import { AdapterConfig } from "./src/interfaces/adapter-config";

export const adapterConfig: AdapterConfig = {
    /*cms: {
        type: 'contentful',
        credentials: {
            space: "zjrd7s7o2cec",
            accessToken:"llgJXPycQ8ey-VF-piNoqwinwOjgnX6DN44TmElwtXE"
        }
    },*/
    cms: {
        credentials: {
            endpoint: "https://headless-cms-adapter.cdn.prismic.io/api/v2",
        },
        type: "prismic",
    },
    contents: [{
        inputType: "page",
        outputType: "website",
        propertyAdjustments: [
            {
                inputIdentifier: ["title"],
                valueConverter: (value) => {
                    return JSON.stringify(value[0].text);
                },
            },
        ],
    }],
};
