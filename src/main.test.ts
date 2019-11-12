import { ContentAdapter } from "./content-adapter";
import { getContentAdapter } from "./main";
import { ICmsAdapter } from "./interfaces/cms-adapter";
jest.mock("./content-adapter");

describe("getContentAdapter", () => {
    test("throws an error if called without adapter", async () => {
        expect(() => getContentAdapter(undefined)).toThrow(ReferenceError);
    });
    test("returns content adapter", async () => {
        let cmsAdapter: ICmsAdapter = {
            supportsFieldWiseAdjustment: false,
            getNormalizedContentData: undefined
        };
        getContentAdapter(cmsAdapter);
        expect(ContentAdapter).toHaveBeenCalledTimes(1);
    });
});
