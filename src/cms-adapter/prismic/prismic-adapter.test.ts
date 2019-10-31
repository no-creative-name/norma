import { PrismicAdapter } from "./prismic-adapter";

describe("PrismicAdapter", () => {
    test("throws an error when created with undefined config", () => {
        expect(() => new PrismicAdapter(undefined)).toThrow(Error);
    });
    describe("getNormalizedContentData", () => {
        const adapter = new PrismicAdapter({endpoint: "https://headless-cms-adapter.cdn.prismic.io/api/v2"});
        test("throws an error when no content is associated with content id", async () => {
            await expect(adapter.getNormalizedContentData("fas", "en-US").catch()).rejects;
        });
    });
});
