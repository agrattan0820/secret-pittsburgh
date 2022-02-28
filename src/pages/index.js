import React, { useState, useMemo, useRef } from "react";
import parse from "html-react-parser";
import { graphql } from "gatsby";
import { Drawer, Button } from "antd";
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
import { shortenString } from "../util";
// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const IndexPage = ({ data }) => {
  const [viewState, setViewState] = useState({
    latitude: 40.4406,
    longitude: -79.9959,
    zoom: 14,
    bearing: 0,
    pitch: 45, // pitch in degrees
  });
  const [location, setLocation] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mapRef = useRef();

  const goToLoc = (lat, lng) => {
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 15, duration: 800 });
  };

  const pins = useMemo(
    () =>
      data.allNodeLocation.nodes.map((location, i) => (
        <Marker
          key={i}
          longitude={location.field_geolocation.lng}
          latitude={location.field_geolocation.lat}
          anchor="bottom"
          onClick={() => {
            goToLoc(
              location.field_geolocation.lat,
              location.field_geolocation.lng
            );
            setLocation(location);
            setDrawerOpen(true);
          }}
        >
          <Pin />
        </Marker>
      )),
    [data.allNodeLocation.nodes]
  );

  console.log(data);

  return (
    <main>
      <Seo />
      <section className="container relative mx-auto">
        <h1 className="absolute z-50 px-4 py-2 text-2xl font-bold transform -translate-x-1/2 rounded bg-slate-200 top-8 left-1/2">
          Secret Pittsburgh
        </h1>
        <Map
          {...viewState}
          style={{ width: "100%", height: "100vh", overflow: "hidden" }}
          ref={mapRef}
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
        <Drawer
          title={location?.title ?? "Location"}
          placement="left"
          onClose={() => setDrawerOpen(false)}
          visible={drawerOpen}
        >
          {location && (
            <>
              <img
                className="mb-4"
                src={`https://secretpittsburgh.pitt.edu/${location?.relationships.field_associated_guidebook_entry.relationships.field_image[0].uri.url}`}
                alt={
                  location?.relationships.field_associated_guidebook_entry
                    .field_image[0].alt
                }
              />
              {parse(
                shortenString(
                  location?.relationships.field_associated_guidebook_entry.body
                    .processed,
                  550
                )
              )}
            </>
          )}
        </Drawer>
        {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
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
          field_associated_guidebook_entry {
            body {
              processed
            }
            field_image {
              alt
            }
            title
            relationships {
              field_image {
                uri {
                  url
                }
              }
            }
          }
          field_associated_basic_info_entr {
            body {
              processed
            }
            title
          }
          node__article {
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
            title
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
