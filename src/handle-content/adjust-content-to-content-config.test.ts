import { adjustContentToContentConfig } from "./adjust-content-to-content-config";

describe("adjustContentToContentConfig", () => {
    test("returns unaltered input if input is not a valid content", () => {
        const input = {
            prop1: "x",
            prop2: "y"
        };
        const result = adjustContentToContentConfig((input as any), ({} as any));
        expect(result).toEqual(input);
    })
    test("renames all instances of a single content type if desired", () => {
        const input = {
            data: {
                x: "",
                y: "",
                z: {
                    data: {},
                    id: "5678",
                    type: "a",
                }
            },
            id: "1234",
            type: "a",
        };
        const config = {
            inputType: "a",
            outputType: "b",
        };
        const output = {
            data: {
                x: "",
                y: "",
                z: {
                    data: {},
                    id: "5678",
                    type: "b",
                },
            },
            id: "1234",
            type: "b",
        };
        const result = adjustContentToContentConfig(input, config);
        expect(result).toEqual(expect.objectContaining(output));
    });
    test("throws error if value converter could not be applied", () => {
        const input = {
            data: {
                x: "",
                y: "",
                z: {
                    data: {},
                    id: "5678",
                    type: "a",
                }
            },
            id: "1234",
            type: "a",
        };
        const config = {
            inputType: "a",
            outputType: "a",
            propertyAdjustments: [
                {
                    inputIdentifier: "x",
                    valueConverter: (value) => {
                        return value.content.x;
                    },
                },
            ],
        };
        expect(() => adjustContentToContentConfig(input, config)).toThrow(Error);
    });
    test("throws ReferenceError if value converter returns undefined", () => {
        const input = {
            data: {
                x: "",
                y: "",
                z: {
                    data: {},
                    id: "5678",
                    type: "a",
                }
            },
            id: "1234",
            type: "a",
        };
        const config = {
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
        };
        expect(() => adjustContentToContentConfig(input, config)).toThrow(ReferenceError)
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
                }
            },
            id: "1234",
            type: "a",
        };
        const config = {
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
        };
        const output = {
            data: {
                x: "test",
                y: "",
                z: {
                    data: {},
                    id: "5678",
                    type: "a",
                },
            },
            type: "a",
        };
        const result = adjustContentToContentConfig(input, config);
        expect(result).toEqual(expect.objectContaining(output));
    });
    test("resolves value with circular references", () => {
        const objA = {
            data: {
                "self-reference": {
                },
            },
            id: "XbK69BIAACEAt2GT",
            type: "self-referencing",
        };
        objA.data["self-reference"] = objA;

        const config = {
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
        };

        expect(() => adjustContentToContentConfig(objA, config)).not.toThrow(RangeError);
    });
    test("removes parent objects if they're empty after adjustment", () => {
        const input = {
            data: {
                x: {
                    a: {
                        b: "value"
                    }
                }
            },
            id: "1234",
            type: "a",
        };
        const config = {
            inputType: "a",
            propertyAdjustments: [
                {
                    inputIdentifier: "x.a.b",
                    outputIdentifier: "v.b.e"
                },
            ],
        };
        const output = {
            data: {
                v: {
                    b: {
                        e: "value"
                    }
                }
            },
            id: "1234",
            type: "a",
        };
        const result = adjustContentToContentConfig(input, config);
        expect(result).toEqual(expect.objectContaining(output));
    });
    test("can move and rename properties", () => {
        const input = {
            data: {
                w: [
                    {
                        data: {},
                        id: "2345",
                        type: "g"
                    },
                    {
                        data: {},
                        id: "1234",
                        type: "g"
                    }
                ],
                x: {
                    a: {
                        b: "value"
                    },
                    c: ""
                },
                y: 123,
                z: {
                    data: {},
                    id: "5678",
                    type: "b",
                }
            },
            id: "1234",
            type: "a",
        };
        const config = {
            inputType: "a",
            propertyAdjustments: [
                {
                    inputIdentifier: "x.a.b",
                    outputIdentifier: "v.b.e"
                },
                {
                    inputIdentifier: "y",
                    outputIdentifier: "d"
                }
            ],
        };
        const output = {
            data: {
                w: [
                    {
                        data: {},
                        id: "2345",
                        type: "g"
                    },
                    {
                        data: {},
                        id: "1234",
                        type: "g"
                    }
                ],
                x: {
                    c: ""
                },
                v: {
                    b: {
                        e: "value"
                    }
                },
                d: 123,
                z: {
                    data: {},
                    id: "5678",
                    type: "b",
                },
            },
            id: "1234",
            type: "a",
        };
        const result = adjustContentToContentConfig(input, config);
        expect(result).toEqual(expect.objectContaining(output));
    });
})