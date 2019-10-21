import { handleContent } from "./handle-content"

describe('handleContent', () => {
    test('throws an error when content input is undefined.', () => {
        expect(() => {handleContent(undefined, [{inputType: 'componentX'}])}).toThrow(Error);
    });
    test('renames all instances of a single content type if desired', () => {
        const input = {
            type: "a",
            data: {
                x: "",
                y: "",
                z: {
                    type: "a",
                    data: {}
                }
            }
        }
        const configs = [{
            inputType: 'a',
            outputType: 'b',
        }]
        const output = {
            type: "b",
            data: {
                x: "",
                y: "",
                z: {
                    type: "b",
                    data: {}
                }
            }
        }
        const result = handleContent(input, configs);
        expect(result).toMatchObject(output);
    });
})