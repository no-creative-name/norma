import { ContentAdapter } from "./content-adapter";
import { getContentAdapter } from "./main";
import { ContentfulAdapter } from "norma-connect-contentful";
jest.mock("./content-adapter");

const adapterConfig = {
    cms: {
        credentials: {
            accessToken: "llgJXPycQ8ey-VF-piNoqwinwOjgnX6DN44TmElwtXE",
            space: "zjrd7s7o2cec",
        },
        type: "contentful",
    },
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
}

describe("getContentAdapter", () => {
    test("throws an error if called without adapter", async () => {
        expect(() => getContentAdapter(undefined)).toThrow(Error);
    });
    test("returns content adapter", async () => {
        getContentAdapter(new ContentfulAdapter(adapterConfig.cms.credentials));
        expect(ContentAdapter).toHaveBeenCalledTimes(1);
    });
});
