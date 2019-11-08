import { ContentAdapter } from "./content-adapter";
import { ICmsAdapter } from "./interfaces/cms-adapter";

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
                inputIdentifier: "title",
                valueConverter: (value) => {
                    return value;
                },
            },
        ],
    }],
};

describe("contentAdapter", () => {
    const contentAdapter = new ContentAdapter(({} as ICmsAdapter), adapterConfig.contents);

    test("throws an error if initialized without adapter config", async () => {
        expect(() => new ContentAdapter(undefined)).toThrow(Error);
    });
    test("throws an error if content id is undefined", async () => {
        expect(await contentAdapter.getContent(undefined, "y").catch(() => {})).rejects;
    });
    test("throws an error if locale is undefined", async () => {
        expect(await contentAdapter.getContent("x", undefined).catch(() => {})).rejects;
    });
    test("calls function to get normalized data from cms adapter", async () => {
        const getData = jest.fn();
        contentAdapter['cmsAdapter'].getNormalizedContentData = getData;
        await contentAdapter.getContent("x", "y").catch(() => {});
        expect(contentAdapter['cmsAdapter'].getNormalizedContentData).toHaveBeenCalled();
    });
});
