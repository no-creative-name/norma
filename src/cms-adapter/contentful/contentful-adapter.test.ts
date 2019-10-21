import { ContentfulAdapter } from "./contentful-adapter";
  
describe('ContentfulAdapter', () => {
    test('throws an error when created with undefined config', () => {
        expect(() => {new ContentfulAdapter(undefined)}).toThrow(Error);
    });
    describe('fetchDataForContentId', () => {
        const adapter = new ContentfulAdapter({space: "zjrd7s7o2cec", accessToken:"llgJXPycQ8ey-VF-piNoqwinwOjgnX6DN44TmElwtXE"});
        test('throws an error when no content is associated with content id', async () => {
            adapter.getNormalizedContentData('fas', 'en-US').catch(e => expect(e).toMatch('error'));
        });
    })
});
