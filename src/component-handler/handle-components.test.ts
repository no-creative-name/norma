import { handleComponents } from "./handle-components"

describe('handleComponents', () => {
    test('throws an error when content input is undefined.', () => {
        expect(() => {handleComponents(undefined, [{inputType: 'componentX'}])}).toThrow(Error);
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
        const result = handleComponents(input, configs);
        expect(result).toMatchObject(output);
    });
})