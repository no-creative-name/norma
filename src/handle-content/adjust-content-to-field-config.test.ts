import { adjustContentToFieldConfig } from "./adjust-content-to-field-config";

describe("adjustContentToFieldConfig", () => {
    test("throws error if input is undefined", () => {
        expect(() => adjustContentToFieldConfig(undefined, {
            fieldIdentifier: '',
            valueConverter: () => {}
        })).toThrow(ReferenceError);
    });
    test("throws error if fieldConfig is undefined", () => {
        expect(() => adjustContentToFieldConfig({
            data: {},
            type: '',
            id: ''
        }, undefined)).toThrow(ReferenceError);
    });
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
                                value: 1234,
                                fieldType: "number"
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
                            data: {
                                fieldCA: {
                                    value: "perhaps",
                                    fieldType: "string"
                                }
                            },
                            id: '3',
                            type: 'nice'
                        }
                    ],
                    fieldType: "referenceArray"
                },
                fieldE: {
                    fieldType: "object",
                    value: {
                        a: "x"
                    }
                },
                fieldF: {
                    fieldType: "array",
                    value: [
                        'a', 'b'
                    ]
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
                fieldA: {
                    value: "maybe",
                    fieldType: "string"
                },
                fieldB: {
                    value: "maybe",
                    fieldType: "string"
                },
                fieldC: {
                    value: {
                        data: {
                            fieldCA: {
                                value: 1234,
                                fieldType: "number"
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
                            data: {
                                fieldCA: {
                                    value: "maybe",
                                    fieldType: "string"
                                }
                            },
                            id: '3',
                            type: 'nice'
                        }
                    ],
                    fieldType: "referenceArray"
                },
                fieldE: {
                    fieldType: "object",
                    value: {
                        a: "x"
                    }
                },
                fieldF: {
                    fieldType: "array",
                    value: [
                        'a', 'b'
                    ]
                }
            },
            id: '2',
            type: ''
        };
        const result = adjustContentToFieldConfig(input, config);
        
        expect(result).toEqual(expect.objectContaining(output));
    });
    test("converts arrays", () => {
        const input = {
            data: {
                fieldA: {
                    fieldType: "array",
                    value: [
                        1,
                        2
                    ]
                },
                fieldB: {
                    fieldType: "array",
                    value: [
                        3,
                        4
                    ]
                }
            },
            id: '2',
            type: ''
        };
        const config = {
            fieldIdentifier: "array",
            valueConverter: (value) => {
                return value.map(v => v + 1);
            }
        };
        const output = {
            data: {
                fieldA: {
                    fieldType: "array",
                    value: [
                        2,
                        3
                    ]
                },
                fieldB: {
                    fieldType: "array",
                    value: [
                        4,
                        5
                    ]
                }
            },
            id: '2',
            type: ''
        };
        const result = adjustContentToFieldConfig(input, config);
        
        expect(result).toEqual(expect.objectContaining(output));
    });
    test("converts objects", () => {
        const input = {
            data: {
                fieldA: {
                    fieldType: "object",
                    value: {
                        a: {
                            x: ""
                        },
                        b: 1,
                        c: "!"
                    }
                },
            },
            id: '2',
            type: ''
        };
        const config = {
            fieldIdentifier: "object",
            valueConverter: (value) => {
                return value.a
            }
        };
        const output = {
            data: {
                fieldA: {
                    fieldType: "object",
                    value: {
                        x: ""
                    }
                },
            },
            id: '2',
            type: ''
        };
        const result = adjustContentToFieldConfig(input, config);
        
        expect(result).toEqual(expect.objectContaining(output));
    });
});
