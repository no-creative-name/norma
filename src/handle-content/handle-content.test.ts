import { handleContent } from "./handle-content";

describe("handleContent", () => {
    test("throws an error when content input is undefined.", () => {
        expect(() => {handleContent(undefined, [{inputType: "componentX"}]);}).toThrow(Error);
    });
    test("renames all instances of a single content type if desired", () => {
        const input = {
            type: "a",
            data: {
                x: "",
                y: "",
                z: {
                    type: "a",
                    data: {},
                    id: "5678",
                },
            },
            id: "1234",
        };
        const configs = [{
            inputType: "a",
            outputType: "b",
        }];
        const output = {
            type: "b",
            data: {
                x: "",
                y: "",
                z: {
                    type: "b",
                    data: {},
                },
            },
        };
        const result = handleContent(input, configs);
        expect(result).toMatchObject(output);
    });
    test("converts value if converter if provided", () => {
        const input = {
            type: "a",
            data: {
                x: "",
                y: "",
                z: {
                    type: "a",
                    data: {},
                    id: "5678",
                },
            },
            id: "1234",
        };
        const configs = [{
            inputType: "a",
            outputType: "a",
            propertyAdjustments: [
                {
                    inputIdentifier: ["x"],
                    valueConverter: (value) => {
                        return `test`;
                    },
                },
            ],
        }];
        const output = {
            type: "a",
            data: {
                x: "test",
                y: "",
                z: {
                    type: "a",
                    data: {},
                },
            },
        };
        const result = handleContent(input, configs);
        expect(result).toMatchObject(output);
    });
    test("resolves value with circular references", () => {
        const objA = {
            type: "self-referencing",
            data: {
                "title": [],
                "self-reference": {},
            },
            id: "XbK69BIAACEAt2GT",
        };
        objA.data["self-reference"] = objA;

        const configs = [{
            inputType: "page",
            outputType: "asd",
            propertyAdjustments: [
                {
                    inputIdentifier: ["title"],
                    outputIdentifier: [""],
                    valueConverter: (value) => {
                        return JSON.stringify(value[0].text);
                    },
                },
            ],
        }];

        expect(() => {handleContent(objA, configs);}).not.toThrow(RangeError);
    });
});
