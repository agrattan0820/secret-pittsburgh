import { FaBookOpen } from "react-icons/fa";

export default {
  name: "article",
  title: "Article",
  type: "document",
  icon: FaBookOpen,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Headline of article.",
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      description: "Name of article's author.",
    },
    {
      name: "post",
      title: "Post",
      type: "array",
      of: [{ type: "block" }],
      description: "Content of article.",
    },
    {
      name: "place",
      title: "Place",
      type: "reference",
      to: [{ type: "place" }],
      description: "Location that article references.",
    },
  ],
};
