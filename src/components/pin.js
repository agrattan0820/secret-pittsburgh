import * as React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

function Pin({ name, visited }) {
  return (
    <FaMapMarkerAlt
      className={`filter drop-shadow sp-marker-icon ${
        visited && "sp-marker-visited"
      }`}
    />
  );
}

export default Pin;
