import { adjustContentToFieldConfig } from "./adjust-content-to-field-config";

describe("adjustContentToFieldConfig", () => {
    test("throws error if input is undefined", () => {
        expect(() => adjustContentToFieldConfig(undefined, {
            fieldTypeIdentifier: '',
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
    test("throws error if valueConverter couldn't be applied", () => {
        const input = {
            data: {
                fieldA: {
                    fieldType: "object",
                    value: {
                        a: {
                            x: ""
                        }
                    }
                },
            },
            id: '2',
            type: ''
        };
        const config = {
            fieldTypeIdentifier: "object",
            valueConverter: (value) => {
                return value.b.c;
            }
        };
        expect(() => adjustContentToFieldConfig(input, config)).toThrow(Error);
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
            fieldTypeIdentifier: "string",
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
            fieldTypeIdentifier: "array",
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
    test("does not overwrite original value if converted value is undefined", () => {
        const input = {
            data: {
                fieldA: {
                    fieldType: "number",
                    value: 1
                }
            },
            id: '2',
            type: ''
        };
        const config = {
            fieldTypeIdentifier: "number",
            valueConverter: (value) => {
                return undefined;
            }
        };
        const output = input;
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
            fieldTypeIdentifier: "object",
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
    test("converts nested contents", () => {
        const input = {
            data: {
                fieldA: {
                    fieldType: "object",
                    value: {
                        data: {
                            fieldX: {
                                fieldType: "type",
                                value: {
                                    a: {
                                        b: 1
                                    }
                                }
                            }
                        },
                        id: '3',
                        type: ''
                    }
                },
            },
            id: '2',
            type: ''
        };
        const config = {
            fieldTypeIdentifier: "type",
            valueConverter: (value) => {
                return value.a
            }
        };
        const output = {
            data: {
                fieldA: {
                    fieldType: "object",
                    value: {
                        data: {
                            fieldX: {
                                fieldType: "type",
                                value: {
                                    b: 1
                                }
                            }
                        },
                        id: '3',
                        type: ''
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
