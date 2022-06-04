import { FaVideo } from "react-icons/fa";

export default {
  name: "video",
  title: "Video",
  type: "document",
  icon: FaVideo,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Title of video content.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      description: "Name of video's author.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Textual explanation/description of video.",
    },
    {
      name: "link",
      title: "Video Link",
      type: "url",
      description: "URL to YouTube video.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "place",
      title: "Place",
      type: "reference",
      to: [{ type: "place" }],
      description: "Location that video references.",
      validation: (Rule) => Rule.required(),
    },
  ],
};
