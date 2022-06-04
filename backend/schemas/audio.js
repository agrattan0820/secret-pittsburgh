import { FaMicrophone } from "react-icons/fa";

export default {
  name: "audio",
  title: "Audio",
  type: "document",
  icon: FaMicrophone,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Title of audio content.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      description: "Name of audio's author.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Textual explanation/description of audio.",
    },
    {
      name: "file",
      title: "Audio File",
      type: "file",
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
        "Whether the audio is related to a specific location or an entire neighborhood.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "place",
      title: "Place",
      type: "reference",
      to: [{ type: "place" }],
      description: "Location the audio references.",
      hidden: ({ document }) => document?.type !== "place",
    },
    {
      name: "neighborhood",
      title: "Neighborhood",
      type: "reference",
      to: [{ type: "neighborhood" }],
      description: "Neighborhood the audio references.",
      hidden: ({ document }) => document?.type !== "neighborhood",
    },
  ],
};
