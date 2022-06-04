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
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Place", value: "place" },
          { title: "Neighborhood", value: "neighborhood" },
        ],
      },
      description:
        "Whether a video is related to a specific location or an entire neighborhood.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "place",
      title: "Place",
      type: "reference",
      to: [{ type: "place" }],
      description: "Location that video references.",
      hidden: ({ document }) => document?.type !== "place",
    },
    {
      name: "neighborhood",
      title: "Neighborhood",
      type: "reference",
      to: [{ type: "neighborhood" }],
      description: "Neighborhood that video references.",
      hidden: ({ document }) => document?.type !== "neighborhood",
    },
  ],
};
