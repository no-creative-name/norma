import { IAdapterConfig } from "./interfaces/adapter-config";

export let adapterConfig: IAdapterConfig = {
    cms: {
        credentials: {
            accessToken: "llgJXPycQ8ey-VF-piNoqwinwOjgnX6DN44TmElwtXE",
            space: "zjrd7s7o2cec",
        },
        type: "contentful",
    },
    /*cms: {
        credentials: {
            endpoint: "https://headless-cms-adapter.cdn.prismic.io/api/v2",
        },
        type: "prismic",
    },*/
    contents: [{
        inputType: "page",
        outputType: "website",
        propertyAdjustments: [
            {
                inputIdentifier: ["title"],
                valueConverter: (value) => {
                    return value;
                },
            },
        ],
    }],
};