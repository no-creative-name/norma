import { handleContent, adjustContentToFieldConfig } from "./handle-content";

describe("handleContent", () => {
    test("throws an error when content input is undefined.", () => {
        expect(() => handleContent(undefined, [{inputType: "componentX"}])).toThrow(Error);
    });
    test("renames all instances of a single content type if desired", () => {
        const input = {
            data: {
                x: {
                    fieldType: "",
                    value: ""
                },
                y: {
                    fieldType: "",
                    value: ""
                },
                z: {
                    fieldType: "",
                    value: {
                        data: {},
                        id: "5678",
                        type: "a",
                    }
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
                x: {
                    fieldType: "",
                    value: ""
                },
                y: {
                    fieldType: "",
                    value: ""
                },
                z: {
                    fieldType: "",
                    value: {
                        data: {},
                        id: "5678",
                        type: "a",
                    }
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
                x: {
                    fieldType: "",
                    value: ""
                },
                y: {
                    fieldType: "",
                    value: ""
                },
                z: {
                    fieldType: "",
                    value: {
                        data: {},
                        id: "5678",
                        type: "a",
                    }
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
                "self-reference": {
                    fieldType: "",
                    value: {}
                },
            },
            id: "XbK69BIAACEAt2GT",
            type: "self-referencing",
        };
        objA.data["self-reference"] = {
            fieldType: "",
            value: objA
        };

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
                    fieldType: "",
                    value: {
                        a: {
                            b: "value"
                        }
                    }
                },
                y: {
                    fieldType: "",
                    value: ""
                },
                z: {
                    fieldType: "",
                    value: {
                        data: {},
                        id: "5678",
                        type: "b",
                    }
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

describe("adjustContentToFieldConfig", () => {
    test("converts correctly", () => {
        const input = {
            data: {
                fieldA: {
                    value: "yes",
                    fieldType: "string"
                },
                fieldB: {
                    value: "no",
                    fieldType: "string"
                },
                fieldC: {
                    value: {
                        data: {
                            fieldCA: {
                                value: "perhaps",
                                fieldType: "string"
                            }
                        },
                        id: '1',
                        type: 'nice'
                    },
                    fieldType: "reference"
                },
                fieldD: {
                    value: [
                        {
                            value: {
                                data: {
                                    fieldCA: {
                                        value: "perhaps",
                                        fieldType: "string"
                                    }
                                },
                                id: '3',
                                type: 'nice'
                            },
                            fieldType: "reference"
                        }
                    ],
                    fieldType: "referenceArray"
                }
            },
            id: '2',
            type: ''
        };
        const config = {
            fieldIdentifier: "string",
            valueConverter: (value) => {
                return "maybe";
            }
        };
        const output = {
            data: {
                fieldA: "maybe",
                fieldB: "maybe",
                fieldC: {
                    data: {
                        fieldCA: "maybe"
                    },
                    id: '1',
                    type: 'nice'
                },
                fieldD: [
                    {
                        data: {
                            fieldCA: "maybe"
                        },
                        id: '3',
                        type: 'nice'
                    }
                ]
            },
            id: '2',
            type: ''
        };
        const result = adjustContentToFieldConfig(input, config);
        
        expect(result).toEqual(expect.objectContaining(output));
    })
});
