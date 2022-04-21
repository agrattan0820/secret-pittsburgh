import * as React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

function Pin({ visited }) {
  return (
    <FaMapMarkerAlt
      className={`w-6 filter drop-shadow sp-marker-icon ${
        visited && "sp-marker-visited"
      }`}
    />
  );
}

export default Pin;
