import { FaMapPin } from "react-icons/fa";

export default {
  name: "place",
  title: "Place",
  type: "document",
  icon: FaMapPin,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Title of place.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      title: "Location",
      type: "geopoint",
      description: "Geolocation of place.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Textual description of place.",
      validation: (Rule) => Rule.required(),
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
      name: "address",
      title: "Address",
      type: "string",
      description: `Street address of place ("1835 Centre Avenue, Pittsburgh, PA 15219")`,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "hours",
      title: "Hours",
      type: "string",
      description: `Explanation location's hours if needed ("Monday - Friday  8AM - 5PM")`,
    },
    {
      name: "website",
      title: "Website",
      type: "url",
      description: "Place's associated website",
    },
    {
      name: "admission",
      title: "Admission",
      type: "string",
      description: `Price or cost of admission ("Free" or "$10 for Adults")`,
    },
  ],
};
