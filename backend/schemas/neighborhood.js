import { FaCity } from "react-icons/fa";

export default {
  name: "neighborhood",
  title: "Neighborhood",
  type: "document",
  icon: FaCity,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Title of neighborhood.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Textual description of neighborhood.",
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "imageWithCaption",
        },
      ],
    },
    {
      name: "website",
      title: "Community Website",
      type: "url",
      description: "Neighborhood's associated website",
    },
  ],
};
