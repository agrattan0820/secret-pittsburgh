import React, { useState, useMemo, useRef } from "react";
import parse from "html-react-parser";
import { graphql, Link } from "gatsby";
import { Drawer } from "antd";
import Map, { Marker, NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaTimes, FaArrowLeft, FaInfoCircle, FaBook } from "react-icons/fa";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../components/seo";
import Pin from "../components/pin";
import { shortenString } from "../util";
import useStickyState from "../components/useStickyState";
import Controls from "../components/controls";
import { motion, AnimatePresence } from "framer-motion";

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
  const [visitedLocations, setVisitedLocations] = useStickyState(
    [],
    "visited-locations"
  );
  const [tooltip, setTooltip] = useState(false);

  const mapRef = useRef();

  console.log(data);

  const handleLocationOpen = (markerLocation) => {
    setLocation(markerLocation);
    goToLoc(
      markerLocation.field_geolocation.lat,
      markerLocation.field_geolocation.lng
    );
    setDrawerOpen(true);
    if (!visitedLocations.includes(markerLocation.title)) {
      setVisitedLocations([...visitedLocations, markerLocation.title]);
    }
  };

  const goToLoc = (lat, lng) => {
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 15, duration: 800 });
  };

  const onSelect = (v, o, state) => {
    if (state === "filterLocation") {
      const locMatch = data.allNodeLocation.nodes.find(
        (location) => location.title === v
      );
      locMatch && handleLocationOpen(locMatch);
    }

    if (state === "filterNeighborhood") {
      const neighborhoodMatch = data.allTaxonomyTermNeighborhoods.nodes.find(
        (neighborhood) => neighborhood.name === v
      );
      const neighborhoodLats =
        neighborhoodMatch.relationships.node__location.map((location) => {
          return location.field_geolocation.lat;
        });
      const neighborhoodLngs =
        neighborhoodMatch.relationships.node__location.map((location) => {
          return location.field_geolocation.lng;
        });

      const sumLats = neighborhoodLats.reduce(
        (previous, current) => (current += previous)
      );
      const avgLat = sumLats / neighborhoodLats.length;

      const sumLongs = neighborhoodLngs.reduce(
        (previous, current) => (current += previous)
      );
      const avgLong = sumLongs / neighborhoodLngs.length;

      goToLoc(avgLat, avgLong);
    }
  };

  const onChange = (v, state) => {
    console.log(v, state);
  };

  const mapVariants = {
    open: {
      width: "100vw",
      height: "100vh",
      transition: {
        duration: 0.8,
        type: "tween",
        ease: "circOut",
      },
    },
    closed: {
      width: "500px",
      height: "350px",
      transition: {
        duration: 0.8,
        type: "tween",
        ease: "circOut",
      },
    },
  };

  const pins = useMemo(
    () =>
      data.allNodeLocation.nodes.map((markerLocation, i) => (
        <Marker
          key={i}
          longitude={markerLocation.field_geolocation.lng}
          latitude={markerLocation.field_geolocation.lat}
          anchor="bottom"
        >
          <button
            onClick={() => {
              handleLocationOpen(markerLocation);
            }}
            onMouseOver={() => setTooltip(markerLocation)}
            // onMouseMove={() => setTooltip(markerLocation)}
            onMouseOut={() => setTooltip(false)}
            aria-label={`Open location information of ${markerLocation.title}`}
          >
            <Pin
              name={markerLocation.title}
              visited={visitedLocations.includes(markerLocation.title)}
            />
          </button>
        </Marker>
      )),
    [data.allNodeLocation.nodes, visitedLocations, handleLocationOpen]
  );

  return (
    <main>
      <header className="absolute z-50 flex justify-center w-full max-w-2xl transform -translate-x-1/2 top-8 left-1/2">
        {!intro && (
          <button
            onClick={() => setIntro(true)}
            aria-label="Exit map view"
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
      <section
        className={`relative flex flex-col items-center justify-center min-h-screen pb-16 space-x-0 space-y-8 overflow-hidden md:pb-0 lg:space-y-0 lg:space-x-8 lg:flex-row ${
          !intro && "pb-0"
        }`}
      >
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
              className="inline-block px-4 py-2 font-bold text-white transition rounded shadow focus-within:scale-105 hover:scale-105 bg-pitt-blue"
            >
              Let's Go!
            </button>
          </div>
        )}

        <motion.div
          initial={false}
          animate={intro ? "closed" : "open"}
          variants={mapVariants}
          style={{
            overflow: "hidden",
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
            <AnimatePresence>
              {tooltip && (
                <Marker
                  longitude={tooltip.field_geolocation.lng}
                  latitude={tooltip.field_geolocation.lat}
                >
                  <motion.div
                    initial={{ y: 16, opacity: 0, x: "-50%" }}
                    animate={{ y: 0, opacity: 1, x: "-50%" }}
                    className="absolute w-40 px-4 py-2 font-bold text-center text-black rounded shadow pointer-events-none left-1/2 -top-24 bg-slate-200"
                  >
                    {tooltip.title}
                  </motion.div>
                </Marker>
              )}
            </AnimatePresence>
            <NavigationControl position="bottom-right" />
            <GeolocateControl position="bottom-right" />
          </Map>
        </motion.div>

        {intro && (
          <footer className="absolute space-x-4 bottom-8 text-pitt-blue">
            <Link
              to="/about"
              className="inline-block text-pitt-blue hover:underline focus-visible:underline"
            >
              About
            </Link>
            <Link
              to="/bookshelf"
              className="inline-block text-pitt-blue hover:underline focus-visible:underline"
            >
              Bookshelf
            </Link>
            <a
              href="https://www.instagram.com/secretpittsburgh/?hl=en"
              className="inline-block text-pitt-blue hover:underline focus-visible:underline"
            >
              Instagram
            </a>
          </footer>
        )}
        <AnimatePresence>
          {!intro && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed z-50 transform bottom-8"
            >
              <Controls
                locations={data.allNodeLocation}
                neighborhoods={data.allTaxonomyTermNeighborhoods}
                onSelect={onSelect}
                onChange={onChange}
              />
              <motion.ul className="flex space-x-4">
                <li>
                  <Link
                    to="/about"
                    className="flex items-center justify-center w-32 px-4 py-2 space-x-2 font-bold text-center text-white transition transform rounded shadow hover:text-white bg-pitt-blue hover:scale-105"
                  >
                    <span>About</span> <FaInfoCircle />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bookshelf"
                    className="flex items-center justify-center w-32 px-4 py-2 space-x-2 font-bold text-center text-white transition transform rounded shadow hover:text-white bg-pitt-blue hover:scale-105"
                  >
                    <span>Bookshelf</span> <FaBook />
                  </Link>
                </li>
              </motion.ul>
            </motion.nav>
          )}
        </AnimatePresence>

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
              {location?.relationships?.field_associated_guidebook_entry
                ?.relationships?.field_image[0]?.uri?.url && (
                <img
                  className="shadow-md"
                  src={`https://secretpittsburgh.pitt.edu/${location?.relationships.field_associated_guidebook_entry.relationships.field_image[0].uri.url}`}
                  alt={
                    location?.relationships.field_associated_guidebook_entry
                      .field_image[0].alt
                  }
                />
              )}

              <div className="processed-text">
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
    allTaxonomyTermNeighborhoods {
      nodes {
        name
        relationships {
          node__location {
            title
            field_geolocation {
              lat
              lng
            }
          }
        }
      }
    }
  }
`;
