import * as React from "react";
import { graphql } from "gatsby";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../components/seo";
import Pin from "../components/pin";
// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const IndexPage = ({ data }) => {
  const [viewState, setViewState] = React.useState({
    latitude: 40.4406,
    longitude: -79.9959,
    zoom: 14,
    bearing: 0,
    pitch: 45, // pitch in degrees
  });

  const pins = React.useMemo(
    () =>
      data.allNodeLocation.nodes.map((location, i) => (
        <Marker
          key={i}
          longitude={location.field_geolocation.lng}
          latitude={location.field_geolocation.lat}
          anchor="bottom"
        >
          <Pin />
        </Marker>
      )),
    [data.allNodeLocation.nodes]
  );

  return (
    <main>
      <Seo />
      <section className="container mx-auto">
        <Map
          {...viewState}
          style={{ width: "100%", height: "100vh", overflow: "hidden" }}
          onMove={(evt) => setViewState(evt.viewState)}
          mapboxAccessToken={process.env.GATSBY_MAPBOX_ACCESS_TOKEN}
          mapStyle={"mapbox://styles/mapbox/light-v10"}
          // className="w-full h-screen overflow-hidden"
        >
          {pins}
          <NavigationControl />
          <FullscreenControl />
          <ScaleControl />
          <GeolocateControl />
        </Map>
      </section>
    </main>
  );
};

export default IndexPage;

export const query = graphql`
  {
    site {
      siteMetadata {
        author
        description
        siteUrl
        title
      }
    }
    allNodeTypeNodeType {
      nodes {
        name
      }
    }
    allNodeLocation {
      nodes {
        title
        field_geolocation {
          lng
          lat
        }
        relationships {
          field_neighborhood {
            name
          }
          field_main_entry {
            title
            field_place {
              links {
                help {
                  href
                }
              }
            }
            body {
              processed
            }
            field_image {
              alt
            }
            relationships {
              field_image {
                uri {
                  url
                }
              }
            }
          }
        }
      }
    }
    allNodeGuidebookEntry {
      nodes {
        relationships {
          field_image {
            uri {
              url
            }
          }
          node__location {
            title
            field_geolocation {
              lat
              lng
            }
          }
        }
        body {
          format
          processed
          summary
          value
        }
      }
    }
  }
`;
