import { getCmsAdapter } from "./cms-adapter/get-cms-adapter";
import { ContentAdapter } from "./content-adapter";
import { adapterConfig } from "../adapter.config";

describe('contentAdapter', () => {
    const cmsAdapter = getCmsAdapter('contentful', {space: 'x', accessToken: 'x'});
    const contentAdapter = new ContentAdapter(cmsAdapter, adapterConfig.contents);
    
    test('throws an error if initialized without cms adapter', async () => {
        expect(() => new ContentAdapter(undefined)).toThrow(Error);
    });
    test('throws an error if content id is undefined', async () => {
        expect(await contentAdapter.getContent(undefined, 'y').catch(() => {})).rejects;
    });
    test('throws an error if locale is undefined', async () => {
        expect(await contentAdapter.getContent('x', undefined).catch(() => {})).rejects;
    });
    test('calls function to get normalized data from cms adapter', async () => {
        const getData = jest.fn();
        cmsAdapter.getNormalizedContentData = getData;
        await contentAdapter.getContent('x', 'y').catch(() => {});
        expect(cmsAdapter.getNormalizedContentData).toHaveBeenCalled();
    });
})