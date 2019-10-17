import { handleComponent } from "./handle-component"

describe('handleComponent', () => {
    test('throws an error when content input is undefined.', () => {
        expect(() => {handleComponent(undefined, {name: 'componentX'})}).toThrow(Error);
    });
    test('throws an error when component config is undefined.', () => {
        expect(() => {handleComponent({data: {}, type: 'componentXY'}, undefined)}).toThrow(Error);
    });
})