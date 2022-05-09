import { FaHome } from "react-icons";

export default {
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: FaHome,
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Headline text on homepage.",
    },
    {
      name: "subheading",
      title: "Subheading",
      type: "text",
      description: "Text beneath the heading on the homepage.",
    },
    {
      name: "enterButton",
      title: "Enter City Button Text",
      type: "string",
      description: "Text for button that opens up locations.",
    },
    {
      name: "aboutButton",
      title: "About Button Text",
      type: "string",
      description: "Text for button that navigates to about page.",
    },
  ],
};
