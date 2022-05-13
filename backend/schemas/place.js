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
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Textual description of place.",
    },
    {
      name: "location",
      title: "Location",
      type: "geopoint",
      description: "Geolocation of place.",
    },
  ],
};
