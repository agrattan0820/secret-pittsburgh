import { FaUserAlt } from "react-icons/fa";

export default {
  name: "person",
  title: "Person",
  type: "document",
  icon: FaUserAlt,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of person.",
    },
    {
      name: "pronouns",
      title: "Pronouns",
      type: "string",
      description: "Pronouns of person (he/him, they/them, she/they).",
    },
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
      description: "Short bio or description of person.",
    },
    {
      name: "social",
      title: "Social Links",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "image",
      title: "Profile Image",
      type: "image",
    },
  ],
};
