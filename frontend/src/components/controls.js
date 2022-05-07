import * as React from "react";
import { AutoComplete } from "antd";

function Controls({ locations, neighborhoods, onSelect, onChange }) {
  const sortedNeighborhoods = neighborhoods.nodes.sort((a, b) => {
    return a.name.trim().localeCompare(b.name.trim());
  });
  const neighborhoodNames = sortedNeighborhoods.map((neighborhood) => {
    return neighborhood.name.trim();
  });

  const sortedLocations = locations.nodes.sort((a, b) => {
    return a.title.trim().localeCompare(b.title.trim());
  });
  const locationNames = sortedLocations.map((location) => {
    return location.title.trim();
  });

  return (
    <div>
      <AutoComplete
        className="shadow sp-autocomplete"
        placeholder="Filter by location name..."
        dataSource={locationNames}
        allowClear={true}
        onSelect={(v, o) => onSelect(v, o, "filterLocation")}
        onChange={(v) => onChange(v, "filterLocation")}
        filterOption={(inputValue, option) =>
          option.props.children
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
        notFoundContent="Location Not Found"
      />
      <AutoComplete
        className="shadow sp-autocomplete"
        placeholder="Filter by neighborhood..."
        dataSource={neighborhoodNames}
        allowClear={true}
        onSelect={(v, o) => onSelect(v, o, "filterNeighborhood")}
        onChange={(v) => onChange(v, "filterNeighborhood")}
        filterOption={(inputValue, option) =>
          option.props.children
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
        notFoundContent="Neighborhood Not Found"
      />
    </div>
  );
}

export default Controls;
