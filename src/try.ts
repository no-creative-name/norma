import { ContentfulAdapter } from "./cms-adapter/contentful/contentful-adapter";

const adapter = new ContentfulAdapter({space: "zjrd7s7o2cec", accessToken:"llgJXPycQ8ey-VF-piNoqwinwOjgnX6DN44TmElwtXE"});
adapter.getNormalizedContentData("3X0p6DBaVrZMZsLqp9SBso", 'en-US').then(data =>
    console.log(data));
