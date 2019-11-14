import { resolveContent } from "./resolve-content"

describe('resolveContent', () => {
    test('throws error if input content is undefined', () => {
        expect(() => resolveContent(undefined)).toThrow(ReferenceError);
    });
    test('resolves first level content', () => {
        const input = {
            data: {
                fieldX: {
                    fieldType: 'string',
                    value: ''
                },
                fieldY: {
                    fieldType: 'number',
                    value: 123
                },
                fieldZ: {
                    fieldType: 'array',
                    value: [
                        'a', 'b', 'c'
                    ]
                },
                fieldA: {
                    fieldType: 'object',
                    value: {
                        a: 1,
                        b: 2,
                        c: 3
                    }
                }
            },
            id: '123',
            type: 'x',
        };
        const output = {
            data: {
                fieldX: '',
                fieldY: 123,
                fieldZ: ['a', 'b', 'c'],
                fieldA: {
                    a: 1,
                    b: 2,
                    c: 3
                },
            },
            id: '123',
            type: 'x',
        };
        const result = resolveContent(input);
        expect(result).toEqual(expect.objectContaining(output));
    });
    test('resolves deeper level content', () => {
        const input = {
            data: {
                fieldA: {
                    fieldType: 'object',
                    value: {
                        data: {
                            x: {
                                fieldType: 'boolean',
                                value: true
                            }
                        },
                        id: '234',
                        type: 'y'
                    }
                },
                fieldZ: {
                    fieldType: 'array',
                    value: [
                        {
                            data: {
                                x: {
                                    fieldType: 'string',
                                    value: ''
                                }
                            },
                            id: '345',
                            type: 'z'
                        },
                        {
                            data: {
                                x: {
                                    fieldType: 'number',
                                    value: 123
                                }
                            },
                            id: '456',
                            type: 'a'
                        }
                    ]
                }
            },
            id: '123',
            type: 'x',
        };
        const output = {
            data: {
                fieldA: {
                    data: {
                        x: true
                    },
                    id: '234',
                    type: 'y'
                },
                fieldZ: [
                    {
                        data: {
                            x: ''
                        },
                        id: '345',
                        type: 'z'
                    },
                    {
                        data: {
                            x: 123
                        },
                        id: '456',
                        type: 'a'
                    }
                ]
            },
            id: '123',
            type: 'x',
        };
        const result = resolveContent(input);
        expect(result).toEqual(expect.objectContaining(output));
    });
    test("resolves value with circular references", () => {
        const input = {
            data: {
                selfReference: {
                    fieldType: 'reference',
                    value: {}
                }
            },
            id: "XbK69BIAACEAt2GT",
            type: "self-referencing",
        };
        input.data.selfReference.value = input;

        expect(() => resolveContent(input)).not.toThrow(RangeError);
    });
})