// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import homepage from "./homepage";
import place from "./place";
import article from "./article";
import video from "./video";
import audio from "./audio";
import about from "./about";
import person from "./person";
import imageWithCaption from "./blocks/imageWithCaption";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    homepage,
    about,
    place,
    article,
    video,
    audio,
    person,
    imageWithCaption,
  ]),
});
