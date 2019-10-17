import { handleComponent } from "./handle-component"

describe('handleComponent', () => {
    test('throws an error when content input is undefined.', () => {
        expect(() => {handleComponent(undefined, {inputType: 'componentX'})}).toThrow(Error);
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
        const config = {
            inputType: 'a',
            outputType: 'b',
        }
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
        const result = handleComponent(input, config);
        expect(result).toMatchObject(output);
    });
})