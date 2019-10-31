import { Entry } from "contentful";
import { normalizeContentfulData } from "./normalize-contentful-data";

const expectedInput = {
    fields: {
        fieldA: "",
        fieldB: 0,
        subContentA: {
            fields: {
                fieldA: "",
                fieldB: 0,
            },
            sys: {
                contentType: {
                    sys: {
                        id: "contentTypeB",
                    },
                },
                id: "1",
            },
        },
        subContentB: [
            {
                fields: {
                    fieldA: "",
                    fieldB: 0,
                },
                sys: {
                    contentType: {
                        sys: {
                            id: "contentTypeC",
                        },
                    },
                    id: "2",
                },
            },
            {
                fields: {
                    fieldA: "",
                    fieldB: 0,
                },
                sys: {
                    contentType: {
                        sys: {
                            id: "contentTypeC",
                        },
                    },
                    id: "3",
                },
            },
        ],
    },
    sys: {
        contentType: {
            sys: {
                id: "contentTypeA",
            },
        },
        id: "4",
    },
};
const expectedOutput = {
    data: {
        fieldA: "",
        fieldB: 0,
        subContentA: {
            data: {
                fieldA: "",
                fieldB: 0,
            },
            type: "contentTypeB",
        },
        subContentB: [
            {
                data: {
                    fieldA: "",
                    fieldB: 0,
                },
                type: "contentTypeC",
            },
            {
                data: {
                    fieldA: "",
                    fieldB: 0,
                },
                type: "contentTypeC",
            },
        ],
    },
    type: "contentTypeA",
};

describe("normalizeContentfulData", () => {
    test("throws an error for undefined input", () => {
        expect(() => {normalizeContentfulData(undefined); }).toThrow(Error);
    });
    test("correctly converts raw to normalized data", () => {
        const result = normalizeContentfulData((expectedInput as Entry<unknown>));
        expect(result).toMatchObject(expectedOutput);
    });
});
