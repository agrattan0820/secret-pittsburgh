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
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "person" }],
      description: "Article's author.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "post",
      title: "Post",
      type: "array",
      of: [{ type: "block" }],
      description: "Content of article.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "place",
      title: "Place",
      type: "reference",
      to: [{ type: "place" }],
      description: "Location that article references.",
      validation: (Rule) => Rule.required(),
    },
  ],
};
