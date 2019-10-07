import { handleComponent } from "./handleComponent"

test('Throws an error when content input is faulty.', () => {
    expect(handleComponent(undefined, {name: 'componentX'})).toThrowError();
})