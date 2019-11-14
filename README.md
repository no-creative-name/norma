
# norma 👵🏼

### what is norma?
 
norma is the missing piece between your headless CMS and your web components. She connects your frontend to the CMS, fetches the data for any content, normalizes them and lets you decide how to process them.


### how to use norma?

#### installation

Just install norma via npm like any other package:

```shell
npm install https://github.com/no-creative-name/norma --save
```

#### before use

To connect with the headless CMS of your choice you also need to install the respective connection module. As of now, the following connection modules exist:

- [norma-connect-contentful](https://github.com/no-creative-name/norma-connect-contentful)
- [norma-connect-prismic](https://github.com/no-creative-name/norma-connect-prismic)

#### usage

Then you can import and use norma like this (example with contentful connection):

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

The object you receive will have the following data structure:

```json
{
 "data": {
  "property1": "value1",
  "property2": {
   "data": {
   },
   "id": "content_id",
   "type": "type_of_the_subcontent"
  },
 },
 "id": "content_id",
 "type": "type_of_the_content"
}
```

The property data contains all the fields of your content, including the normalized subcontents.

#### content-type-wise processing

If you want to customize the values of some properties for all instances of a content type, you have the option to pass a content configuration. To see what's possible, let's have a look at the following examplory config:

```js
[{
  inputType: "introduction",
  outputType: "intro",
  propertyAdjustments: [
    {
      inputIdentifier: "headline.textualContent.title",
      outputIdentifier: "headline.title",
      valueConverter: (value) => {
      	return `${value} yay!`;
      },
    },
  ],
}]
```

If there is one or more contents with the type "introduction" inside your content object, this configuration will rename the content type to "intro". Furthermore it will apply all property adjustments to its data. In this case, it searches for the property `headline.textualContent.title`, converts its value with the valueConverter function, and then puts it under the stated hierarchy, here `headline.content`. At the same time it removes the old property to keep the object clean.

To use a custom content configuration, you have to pass it into the 'getContentAdapter' method like this:
```typescript
const contentAdapter = getContentAdapter(cmsAdapter, your_content_config);
```
#### field-wise processing

You are also able to customize the values for the same field types. This comes in handy when you want to convert the same fields like images the same way throughout all content types.

```js
[{
	fieldIdentifier: "image",
	valueConverter: (image) => {
		return {
			imgUrl: image.url,
			imgAltText: image.alternativeText
		}
	}
}]
```

This configuration will find all fields of the type "image" and then apply the valueConverter function to its value.
To use a custom field configuration, you have to pass it into the 'getContentAdapter' method like this:
```typescript
const contentAdapter = getContentAdapter(cmsAdapter, undefined, your_field_config);
```
Note that there's an 'undefined' as second parameter, since here we don't want any content-type-wise adjustments and therefore don't pass in a config for that.

## warning ⚠️
The delivered content object may contain circular references, regarding to your content in CMS.
