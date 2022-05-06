import React, { useState, useMemo, useRef } from "react";
import parse from "html-react-parser";
import { graphql, Link, navigate } from "gatsby";
import { Drawer } from "antd";
import Map, { Marker, NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  FaTimes,
  FaArrowLeft,
  FaInfoCircle,
  FaBook,
  FaListAlt,
} from "react-icons/fa";
import { GiSuspensionBridge } from "react-icons/gi";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../components/seo";
import Pin from "../components/pin";
import { isOutOfMaxBounds, shortenString } from "../util";
import useStickyState from "../components/useStickyState";
import Controls from "../components/controls";
import { motion, AnimatePresence } from "framer-motion";
import useMediaQuery from "../components/useMediaQuery";

// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const IndexPage = ({ data, location: router }) => {
  const [viewState, setViewState] = useState({
    latitude: 40.4406,
    longitude: -79.9959,
    zoom: 13,
    bearing: 0,
    pitch: 45,
    width: "100%",
    height: "100vh",
    minZoom: 12,
  });
  const [location, setLocation] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [intro, setIntro] = useState(router?.state?.back !== true);
  const [visitedLocations, setVisitedLocations] = useStickyState(
    [],
    "visited-locations"
  );
  const [tooltip, setTooltip] = useState(false);
  const [listView, setListView] = useStickyState(false, "list-view");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const mapRef = useRef();

  const handleLocationOpen = (markerLocation) => {
    setLocation(markerLocation);
    goToLoc(
      markerLocation.field_geolocation.lat,
      markerLocation.field_geolocation.lng
    );
    setTimeout(() => {
      setDrawerOpen(true);
      if (!visitedLocations.includes(markerLocation.title)) {
        setVisitedLocations([...visitedLocations, markerLocation.title]);
      }
    }, 400);
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
      borderRadius: "0",
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
      borderRadius: "0.25rem",
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
            onFocus={() => setTooltip(markerLocation)}
            onMouseOut={() => setTooltip(false)}
            onBlur={() => setTooltip(false)}
            aria-label={`Open location information of ${markerLocation.title}`}
          >
            <Pin visited={visitedLocations.includes(markerLocation.title)} />
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
            aria-label="Exit list view and go back to map"
            className="absolute p-2 text-lg text-white transform -translate-y-1/2 rounded-full lg:text-xl bg-pitt-blue left-8 top-1/2"
          >
            <FaArrowLeft />
          </button>
        )}
        <h1 className="px-4 py-2 text-lg font-bold text-white rounded shadow w-min lg:text-2xl xl:text-3xl bg-pitt-blue">
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
            <h2 className="text-4xl font-bold leading-tight lg:leading-tight lg:text-5xl font-title">
              Hidden Gems in the Steel City{" "}
              <GiSuspensionBridge
                className="inline-block ml-2 text-pitt-blue"
                aria-label="Bridge Icon"
              />
            </h2>
            <p>
              The "Secret Pittsburgh" Literature class invites University of
              Pittsburgh students to explore unusual or hidden spaces of the
              city, including "secret" spaces within well-known landmarks.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  if (listView) {
                    navigate("/list-view");
                  } else {
                    setIntro(false);
                  }
                }}
                className="inline-block px-4 py-2 font-bold text-white transition rounded shadow focus-visible:scale-105 hover:scale-105 bg-pitt-blue"
              >
                Enter the City
              </button>
              <Link
                to="/about"
                aria-label="About page"
                className="inline-block px-4 py-2 font-bold transition border-2 rounded shadow text-pitt-blue border-pitt-blue hover:text-pitt-blue focus-visible:text-pitt-blue focus-visible:scale-105 hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        )}

        <motion.div
          initial={false}
          animate={intro ? "closed" : "open"}
          variants={mapVariants}
          style={{
            overflow: "hidden",
            position: "relative",
          }}
        >
          {intro && (
            <div
              className="absolute top-0 left-0 flex items-center justify-center animate-pulse"
              style={{
                width: "500px",
                height: "350px",
                backgroundColor: "#f6f6f4",
              }}
            >
              <svg
                role="status"
                className="w-8 h-8 text-slate-200 animate-spin fill-pitt-blue"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          )}
          <Map
            {...viewState}
            reuseMaps
            style={{
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              margin: "0 auto",
              position: "relative",
              top: intro ? "-50%" : "unset",
              left: isDesktop && intro ? "-100%" : "unset",
              transformOrigin: "center",
            }}
            ref={mapRef}
            onMove={(evt) => {
              intro && setIntro(false);
              listView && setListView(false);
              if (
                !isOutOfMaxBounds(
                  evt.viewState.latitude,
                  evt.viewState.longitude,
                  [
                    [-80.13342, 40.30733],
                    [-79.738968, 40.578369],
                  ]
                )
              ) {
                setViewState(evt.viewState);
              }
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
            {isDesktop && (
              <>
                <NavigationControl position="bottom-right" />
                <GeolocateControl position="bottom-right" />
              </>
            )}
          </Map>
        </motion.div>

        {intro && (
          <footer className="space-x-4 lg:absolute lg:bottom-8 text-pitt-blue">
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
            <a
              href="https://twitter.com/Secret_PGH?s=20&t=Hai0p_eXqekpzlkH2_XYvQ"
              className="inline-block text-pitt-blue hover:underline focus-visible:underline"
            >
              Twitter
            </a>
          </footer>
        )}
        <AnimatePresence>
          {!intro && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed z-50 w-full transform md:w-auto bottom-8"
            >
              <div className="mx-auto w-80 md:w-auto">
                <Controls
                  locations={data.allNodeLocation}
                  neighborhoods={data.allTaxonomyTermNeighborhoods}
                  onSelect={onSelect}
                  onChange={onChange}
                />
              </div>

              <motion.ul className="flex justify-center space-x-2 md:space-x-4">
                <li>
                  <Link
                    to="/about"
                    className="flex items-center justify-center px-4 py-2 space-x-2 font-bold text-center text-white transition transform rounded shadow md:w-32 hover:text-white bg-pitt-blue hover:scale-105"
                  >
                    <span>About</span> <FaInfoCircle />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bookshelf"
                    className="flex items-center justify-center px-4 py-2 space-x-2 font-bold text-center text-white transition transform rounded shadow md:w-32 hover:text-white bg-pitt-blue hover:scale-105"
                  >
                    <span>Bookshelf</span> <FaBook />
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setListView(true);
                      navigate("/list-view");
                    }}
                    className="flex items-center justify-center px-4 py-2 space-x-2 font-bold text-center text-white transition transform rounded shadow md:w-32 hover:text-white bg-pitt-blue hover:scale-105"
                  >
                    <span>List View</span> <FaListAlt />
                  </button>
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
          closeIcon={<FaTimes className="text-xl" />}
        >
          <AnimatePresence>
            {location && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 leading-loose"
              >
                {location?.relationships?.field_associated_guidebook_entry
                  ?.relationships?.field_image[0]?.uri?.url === undefined &&
                location?.relationships?.field_associated_guidebook_entry?.body
                  ?.processed === undefined ? (
                  <div className="space-y-2">
                    <p className="font-bold leading-loose xl:leading-loose xl:text-lg">
                      Oops! Looks like this is an empty location
                    </p>
                    <p>
                      Email Dr. FitzPatrick (jlf115@pitt.edu) about this error
                      or if you have any questions.
                    </p>
                  </div>
                ) : (
                  <>
                    {location?.relationships?.field_associated_guidebook_entry
                      ?.relationships?.field_image[0]?.uri?.url && (
                      <img
                        className="object-cover object-center w-full shadow-md"
                        style={{ maxHeight: "20rem" }}
                        src={`https://secretpittsburgh.pitt.edu${location?.relationships.field_associated_guidebook_entry.relationships.field_image[0].uri.url}`}
                        alt={
                          location?.relationships
                            .field_associated_guidebook_entry.field_image[0].alt
                        }
                      />
                    )}
                    <div className="processed-text">
                      {parse(
                        shortenString(
                          location?.relationships
                            .field_associated_guidebook_entry.body.processed ??
                            "",
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
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Drawer>
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
