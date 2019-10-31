import { ContentfulAdapter } from "./contentful/contentful-adapter";
import { getCmsAdapter } from "./get-cms-adapter";
jest.mock("./contentful/contentful-adapter");

describe("getCmsAdapter", () => {
    test("throws an error if input is undefined", () => {
        expect(() => getCmsAdapter(undefined, undefined)).toThrow(Error);
    });
    test("throws an error if the cms type is not known", () => {
        expect(() => getCmsAdapter("unknown-cms", {})).toThrow(Error);
    });
    test("returns an instance of the associated cms adapter if a cms type is known", () => {
        getCmsAdapter("contentful", {space: "", accessToken: ""});
        expect(ContentfulAdapter).toHaveBeenCalledTimes(1);
    });
});
