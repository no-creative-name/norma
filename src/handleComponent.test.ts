import { handleComponent } from "./handleComponent"

test('Throws an error when content input is undefined.', () => {
    expect(() => {handleComponent(undefined, {name: 'componentX'})}).toThrow(Error);
});
test('Throws an error when component config is undefined.', () => {
    expect(() => {handleComponent({data: {}, metaData: {componentName: 'componentX'}}, undefined)}).toThrow(Error);
});