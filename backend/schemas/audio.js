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
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      description: "Name of audio's author.",
    },
    {
      name: "file",
      title: "Audio File",
      type: "file",
    },
    {
      name: "place",
      title: "Place",
      type: "reference",
      to: [{ type: "place" }],
      description: "Location that audio references.",
    },
  ],
};
