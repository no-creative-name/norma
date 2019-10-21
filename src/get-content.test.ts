import { getContent } from "./get-content"
import { getCmsAdapter } from "./cms-adapter/get-cms-adapter";
import { handleContent } from "./handle-content/handle-content";

describe('getContent', () => {
    const cmsAdapter = getCmsAdapter('contentful', {space: 'x', accessToken: 'x'});
    
    test('throws an error if content id is undefined', async () => {
        expect(await getContent(undefined, 'y', cmsAdapter).catch(() => {})).rejects;
    });
    test('throws an error if locale is undefined', async () => {
        expect(await getContent('x', undefined, cmsAdapter).catch(() => {})).rejects;
    });
    test('throws an error if cms adapter is undefined', async () => {
        expect(await getContent('x', 'y', undefined).catch(() => {})).rejects;
    });
    test('calls function to get normalized data from cms adapter', async () => {
        const getData = jest.fn();
        cmsAdapter.getNormalizedContentData = getData;
        await getContent('x', 'y', cmsAdapter).catch(() => {});
        expect(cmsAdapter.getNormalizedContentData).toHaveBeenCalled();
    });
})