import { FaInfoCircle } from "react-icons/fa";

export default {
  name: "about",
  title: "About Page",
  type: "document",
  icon: FaInfoCircle,
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Headline text on homepage.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "bodyText",
      title: "Body Text",
      type: "array",
      of: [{ type: "block" }],
      description: "Text for button that opens up locations.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "instagramLink",
      title: "Instagram Link",
      type: "url",
      description: "Link URL for Secret Pittsburgh Instagram account.",
    },
    {
      name: "twitterLink",
      title: "Twitter Link",
      type: "url",
      description: "Link URL for Secret Pittsburgh Twitter account.",
    },
  ],
};
