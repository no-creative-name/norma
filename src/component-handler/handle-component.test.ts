import { handleComponent } from "./handle-component"

test('Throws an error when content input is undefined.', () => {
    expect(() => {handleComponent(undefined, {name: 'componentX'})}).toThrow(Error);
});
test('Throws an error when component config is undefined.', () => {
    expect(() => {handleComponent({data: {}, componentName: 'componentXY'}, undefined)}).toThrow(Error);
});