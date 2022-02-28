import * as React from "react";
import { graphql } from "gatsby";
import Map from "react-map-gl";
/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../components/seo";
// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const IndexPage = ({ data }) => {
  return (
    <main>
      <Seo />
      <Map
        initialViewState={{
          latitude: 40.4406,
          longitude: -79.9959,
          pitch: 45,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapboxAccessToken={process.env.GATSBY_MAPBOX_ACCESS_TOKEN}
        mapStyle={"mapbox://styles/mapbox/light-v10"}
      />
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </main>
  );
};

export default IndexPage;

export const query = graphql`
  {
    allNodeLocation {
      nodes {
        title
        field_geolocation {
          lat
          lat_cos
          lat_sin
          lng
          lng_rad
        }
      }
    }
  }
`;
