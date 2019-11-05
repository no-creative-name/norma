# norma 👵🏼

### what is norma?
 
norma is the missing piece between your headless CMS and your web components. She connects your frontend to the CMS, fetches the data for any content, normalizes them and lets you decide how to process them.


### how to use norma?

#### installation

Just install norma via npm like any other package:

`npm install https://github.com/no-creative-name/norma --save`

#### before use

To connect with the headless CMS of your choice you also need to install the respective connection module. As of now, the following connection modules exist:

- [norma-connect-contentful](https://github.com/no-creative-name/norma-connect-contentful)
- [norma-connect-prismic](https://github.com/no-creative-name/norma-connect-prismic)

#### usage

Then you can import and use norma like this:

```typescript
import { ContentfulAdapter } from 'norma-connect-contentful';
import { getContentAdapter } from 'norma';

const cmsAdapter = new ContentfulAdapter({space: 'your_space', accessToken: 'your_access_token'});
const contentAdapter = getContentAdapter(cmsAdapter);
```

Afterwards you can get content like this:

```typescript
await contentAdapter.getContent('your_content_id', 'lang_code');
```

#### content processing

Under construction ⚠️
