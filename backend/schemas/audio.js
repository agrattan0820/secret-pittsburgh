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
      name: "place",
      title: "Place",
      type: "reference",
      to: [{ type: "place" }],
      description: "Location that audio references.",
      validation: (Rule) => Rule.required(),
    },
  ],
};
