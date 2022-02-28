import * as React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

function Pin() {
  return <FaMapMarkerAlt className="filter drop-shadow sp-marker-icon" />;
}

export default React.memo(Pin);
