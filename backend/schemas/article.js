import { FaPenAlt } from "react-icons/fa";

export default {
  name: "article",
  title: "Article",
  type: "document",
  icon: FaPenAlt,
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
      of: [{ type: "block" }, { type: "imageWithCaption" }],
      description: "Content of article.",
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
        "Whether an article is related to a specific location or an entire neighborhood.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "place",
      title: "Place",
      type: "reference",
      to: [{ type: "place" }],
      description: "Location that article references.",
      hidden: ({ document }) => document?.type !== "place",
    },
    {
      name: "neighborhood",
      title: "Neighborhood",
      type: "reference",
      to: [{ type: "neighborhood" }],
      description: "Neighborhood that article references.",
      hidden: ({ document }) => document?.type !== "neighborhood",
    },
  ],
};
