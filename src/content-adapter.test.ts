import { ContentAdapter } from "./content-adapter";
import { ICmsAdapter } from "./interfaces/cms-adapter";
import { IFieldConfig } from "./interfaces/adapter-config";

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
        expect(() => new ContentAdapter(undefined)).toThrow(ReferenceError);
    });
    test("throws an error if initialized with field config, but CMS doesn't support it", async () => {
        expect(() => new ContentAdapter(({supportsFieldTypeWiseAdjustment: false} as ICmsAdapter), undefined, ({} as IFieldConfig[]))).toThrow(Error);
    });
    test("throws an error if content id is undefined", async () => {
        expect(await contentAdapter.getContent(undefined, "y").catch(() => {})).rejects;
    });
    test("throws an error if locale is undefined", async () => {
        expect(await contentAdapter.getContent("x", undefined).catch(() => {})).rejects;
    });
    test("calls function to get normalized data from cms adapter", async () => {
        contentAdapter['cmsAdapter'].getNormalizedContentData = jest.fn();
        await contentAdapter.getContent("x", "y").catch(() => {});
        expect(contentAdapter['cmsAdapter'].getNormalizedContentData).toHaveBeenCalled();
    });
});
