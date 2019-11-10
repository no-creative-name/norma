import { adjustContentToFieldConfig } from "./adjust-content-to-field-config";

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
