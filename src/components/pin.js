import * as React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

function Pin({ name, visited }) {
  console.log(visited);
  return (
    <FaMapMarkerAlt
      className={`filter drop-shadow sp-marker-icon ${
        visited && "sp-marker-visited"
      }`}
      title={`${name} map marker`}
    />
  );
}

export default Pin;
