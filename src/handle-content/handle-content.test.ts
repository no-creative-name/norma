import { handleContent } from "./handle-content";

describe("handleContent", () => {
    test("throws an error when content input is undefined.", () => {
        expect(() => handleContent(undefined, [{inputType: "componentX"}])).toThrow(Error);
    });
    test("renames all instances of a single content type if desired", () => {
        const input = {
            data: {
                x: "",
                y: "",
                z: {
                    data: {},
                    id: "5678",
                    type: "a",
                },
            },
            id: "1234",
            type: "a",
        };
        const configs = [{
            inputType: "a",
            outputType: "b",
        }];
        const output = {
            data: {
                x: "",
                y: "",
                z: {
                    data: {},
                    type: "b",
                },
            },
            type: "b",
        };
        const result = handleContent(input, configs);
        expect(result).toMatchObject(output);
    });
    test("throws TypeError if value converter returns undefined", () => {
        const input = {
            data: {
                x: "",
                y: "",
                z: {
                    data: {},
                    id: "5678",
                    type: "a",
                },
            },
            id: "1234",
            type: "a",
        };
        const configs = [{
            inputType: "a",
            outputType: "a",
            propertyAdjustments: [
                {
                    inputIdentifier: "x",
                    valueConverter: (value) => {
                        return undefined;
                    },
                },
            ],
        }];
        expect(() => handleContent(input, configs)).toThrow(TypeError)
    });
    test("converts value if converter if provided", () => {
        const input = {
            data: {
                x: "",
                y: "",
                z: {
                    data: {},
                    id: "5678",
                    type: "a",
                },
            },
            id: "1234",
            type: "a",
        };
        const configs = [{
            inputType: "a",
            outputType: "a",
            propertyAdjustments: [
                {
                    inputIdentifier: "x",
                    valueConverter: (value) => {
                        return `test`;
                    },
                },
            ],
        }];
        const output = {
            data: {
                x: "test",
                y: "",
                z: {
                    data: {},
                    type: "a",
                },
            },
            type: "a",
        };
        const result = handleContent(input, configs);
        expect(result).toMatchObject(output);
    });
    test("resolves value with circular references", () => {
        const objA = {
            data: {
                "self-reference": {},
                "title": [],
            },
            id: "XbK69BIAACEAt2GT",
            type: "self-referencing",
        };
        objA.data["self-reference"] = objA;

        const configs = [{
            inputType: "page",
            outputType: "asd",
            propertyAdjustments: [
                {
                    inputIdentifier: "title",
                    valueConverter: (value) => {
                        return JSON.stringify(value[0].text);
                    },
                },
            ],
        }];

        expect(() => handleContent(objA, configs)).not.toThrow(RangeError);
    });
    test("can move and rename properties", () => {
        const input = {
            data: {
                x: {
                    a: {
                        b: "value"
                    }
                },
                y: "",
                z: {
                    data: {},
                    id: "5678",
                    type: "b",
                },
            },
            id: "1234",
            type: "a",
        };
        const configs = [{
            inputType: "a",
            propertyAdjustments: [
                {
                    inputIdentifier: "x.a.b",
                    outputIdentifier: "v.b.e"
                },
            ],
        }];
        const output = {
            data: {
                v: {
                    b: {
                        e: "value"
                    }
                },
                y: "",
                z: {
                    data: {},
                    type: "b",
                },
            },
            type: "a",
        };
        const result = handleContent(input, configs);
        expect(result).toMatchObject(output);
    });
});
