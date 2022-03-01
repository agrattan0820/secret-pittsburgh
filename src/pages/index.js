import React, { useState, useMemo, useRef } from "react";
import parse from "html-react-parser";
import { graphql, Link } from "gatsby";
import { Drawer } from "antd";
import Map, {
  Marker,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { AiOutlineClose } from "react-icons/ai";
import { FaTimes, FaArrowLeft } from "react-icons/fa";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../components/seo";
import Pin from "../components/pin";
import { shortenString } from "../util";
// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const IndexPage = ({ data, location: router }) => {
  const [viewState, setViewState] = useState({
    latitude: 40.4406,
    longitude: -79.9959,
    zoom: 14,
    bearing: 0,
    pitch: 45,
    width: "100%",
    height: "100vh",
    minZoom: 12,
  });
  const [location, setLocation] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [intro, setIntro] = useState(router.search !== "?back=true");

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
            setLocation(location);
            goToLoc(
              location.field_geolocation.lat,
              location.field_geolocation.lng
            );
            setDrawerOpen(true);
          }}
        >
          <Pin />
        </Marker>
      )),
    [data.allNodeLocation.nodes]
  );

  return (
    <main>
      <header className="absolute z-50 flex justify-center w-full max-w-2xl transform -translate-x-1/2 top-8 left-1/2">
        {!intro && (
          <button
            onClick={() => setIntro(true)}
            className="absolute p-2 text-lg transform -translate-y-1/2 rounded-full lg:text-xl bg-slate-200 left-8 top-1/2"
          >
            <FaArrowLeft />
          </button>
        )}
        <h1 className="px-4 py-2 text-lg font-bold rounded shadow w-min lg:text-2xl xl:text-3xl bg-slate-200">
          <Link to="/" className="inline-block font-title whitespace-nowrap">
            Secret Pittsburgh
          </Link>
        </h1>
      </header>
      <Seo />
      <section className="relative flex flex-col items-center justify-center min-h-screen pb-8 space-x-0 space-y-8 overflow-hidden md:pb-0 lg:space-y-0 lg:space-x-8 lg:flex-row">
        {intro && (
          <div className="px-4 pt-32 space-y-4 leading-loose max-w-prose lg:pt-0">
            <h2 className="text-3xl font-bold lg:text-6xl lg:leading-snug font-title">
              Find the COOL in Pittsburgh
            </h2>
            <p>
              The "Secret Pittsburgh" Literature class invites University of
              Pittsburgh students to explore unusual or hidden spaces of the
              city, including "secret" spaces within well-known landmarks.
            </p>
            <button
              onClick={() => {
                setIntro(false);
              }}
              className="hidden px-4 py-2 font-bold text-white transition rounded shadow focus-within:scale-105 hover:scale-105 lg:inline-block bg-pitt-blue"
            >
              Let's Go!
            </button>
          </div>
        )}

        <div
          style={{
            width: intro ? "500px" : "100vw",
            height: intro ? "350px" : "100vh",
            overflow: "hidden",
            transition: "all ease .8s",
          }}
        >
          <Map
            {...viewState}
            reuseMaps
            style={{
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              margin: "0 auto",
            }}
            ref={mapRef}
            onMove={(evt) => {
              setIntro(false);
              setViewState(evt.viewState);
            }}
            mapboxAccessToken={process.env.GATSBY_MAPBOX_ACCESS_TOKEN}
            mapStyle={"mapbox://styles/mapbox/light-v10"}
          >
            {pins}
            <NavigationControl position="bottom-right" />
            <ScaleControl />
            <GeolocateControl position="bottom-right" />
          </Map>
        </div>

        {intro && (
          <button
            onClick={() => {
              setIntro(false);
            }}
            className="px-4 py-2 font-bold text-white transition rounded shadow focus-within:scale-105 hover:scale-105 lg:hidden bg-pitt-blue"
          >
            Let's Go!
          </button>
        )}
        <Drawer
          title={location?.title ?? "Location"}
          placement="left"
          onClose={() => setDrawerOpen(false)}
          visible={drawerOpen}
          closeIcon={
            <FaTimes className="absolute text-xl transform -translate-y-1/2 top-1/2 right-8" />
          }
        >
          {location && (
            <div className="space-y-4 leading-loose">
              <img
                className="shadow-md"
                src={`https://secretpittsburgh.pitt.edu/${location?.relationships.field_associated_guidebook_entry.relationships.field_image[0].uri.url}`}
                alt={
                  location?.relationships.field_associated_guidebook_entry
                    .field_image[0].alt
                }
              />
              <div className="drawer-text">
                {parse(
                  shortenString(
                    location?.relationships.field_associated_guidebook_entry
                      .body.processed,
                    550
                  )
                )}
              </div>

              <div className="flex items-center justify-center">
                <Link
                  to={location.gatsbyPath}
                  className="inline-block px-4 py-2 font-bold text-center text-white transition transform rounded shadow hover:text-white bg-pitt-blue hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </div>
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
          node__basics {
            body {
              processed
            }
            title
          }
          node__guidebook_entry {
            title
            body {
              processed
            }
          }
        }
        gatsbyPath(filePath: "/location/{nodeLocation.title}")
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
