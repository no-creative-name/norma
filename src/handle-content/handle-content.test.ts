import { handleContent } from "./handle-content";
import { adjustContentToContentConfig } from "./adjust-content-to-content-config";
import { adjustContentToFieldConfig } from "./adjust-content-to-field-config";

jest.mock('./adjust-content-to-content-config');
jest.mock('./adjust-content-to-field-config');
jest.mock('./resolve-content');

describe("handleContent", () => {
    test("throws an error when content input is undefined.", () => {
        expect(() => handleContent(undefined, [{inputType: "componentX"}])).toThrow(ReferenceError);
    });
    test("calls adjustContentToContentConfig for every content config", () => {
        const content = {
            data: {
                a: {
                    fieldType: '',
                    value: ''
                }
            },
            id: "",
            type: ""
        };
        const configs = [{
            inputType: "a",
            propertyAdjustments: [
                {
                    inputIdentifier: "x.a.b",
                    outputIdentifier: "v.b.e"
                },
            ],
        },{
            inputType: "a",
            propertyAdjustments: [
                {
                    inputIdentifier: "x.a.b",
                    outputIdentifier: "v.b.e"
                },
            ],
        }];
        handleContent(content, configs);
        expect(adjustContentToContentConfig).toHaveBeenCalledTimes(2);
    });
    test("calls adjustContentToFieldConfig for every field config", () => {
        const content = {
            data: {
                a: {
                    fieldType: 'x',
                    value: 'a'
                }
            },
            id: "",
            type: ""
        };
        const fields = [{
            fieldTypeIdentifier: "a",
            valueConverter: (v) => v
        },{
            fieldTypeIdentifier: "b",
            valueConverter: (v) => v
        }];
        handleContent(content, undefined, fields);
        expect(adjustContentToFieldConfig).toHaveBeenCalledTimes(2);
    });
});