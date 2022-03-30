import React from "react";
import parse from "html-react-parser";
import { graphql, Link, navigate } from "gatsby";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaArrowLeft, FaArrowUp, FaBookOpen } from "react-icons/fa";
import scrollTo from "gatsby-plugin-smoothscroll";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../components/seo";
import CityImage from "../images/secret_pittsburgh_list_view.jpg";
import { shortenString } from "../util";
import useStickyState from "../components/useStickyState";

// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const ListViewPage = ({ data }) => {
  const sortedLocations = data.allNodeLocation.nodes.sort((a, b) => {
    return a.title.trim().localeCompare(b.title.trim());
  });

  const [listView, setListView] = useStickyState(true, "list-view");

  console.log(data);
  return (
    <main>
      <Seo title="List View" />
      <header
        className="absolute z-50 flex justify-center w-full max-w-3xl transform -translate-x-1/2 top-8 left-1/2"
        id="page-top"
      >
        <button
          onClick={() => {
            setListView(false);
            navigate("/", {
              state: { back: true },
            });
          }}
          aria-label="Go back to homepage"
          className="absolute text-lg transition transform -translate-y-1/2 focus-visible:scale-105 lg:text-xl left-8 top-1/2"
        >
          <FaArrowLeft />
        </button>
        <h1 className="px-4 py-2 text-lg font-bold text-white rounded shadow w-min lg:text-2xl xl:text-3xl bg-pitt-blue">
          <Link to="/" className="inline-block font-title whitespace-nowrap">
            Secret Pittsburgh
          </Link>
        </h1>
      </header>

      <section className="container relative flex flex-col justify-center min-h-screen pt-32 pb-24 mx-auto ">
        <div className="w-full max-w-3xl px-4 mx-auto space-y-8 leading-loose lg:max-w-5xl">
          <img
            className="object-cover w-full max-w-3xl mx-auto rounded shadow-lg carousel-image"
            src={CityImage}
            alt="City of Pittsburgh"
          />
          <h2 className="w-full max-w-3xl mx-auto text-3xl font-bold font-title">
            Secret Pittsburgh Locations
          </h2>
          <div className="space-y-16 leading-loose xl:leading-loose xl:text-lg">
            <p className="w-full max-w-3xl mx-auto">
              The "Secret Pittsburgh" Literature class invites University of
              Pittsburgh students to explore unusual or hidden spaces of the
              city, including "secret" spaces within well-known landmarks.
            </p>
            {/* <ul className="space-y-8">
              {data.allNodeBookshelfItem.nodes &&
                data.allNodeBookshelfItem.nodes.map((book, i) => (
                  <>
                    <li key={i} className="processed-text">
                      {parse(book.body.processed)}
                      <a
                        href={`https://pitt.primo.exlibrisgroup.com/discovery/search?query=any,contains,${book.title.replaceAll(
                          " ",
                          "%20"
                        )}&tab=Everything&search_scope=MyInst_and_CI&vid=01PITT_INST:01PITT_INST&lang=en&offset=0`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Search in Pitt Library Catalog
                        <FaBookOpen className="inline-block ml-2" />
                      </a>
                    </li>
                    {i !== data.allNodeBookshelfItem.nodes.length - 1 && <hr />}
                  </>
                ))}
            </ul> */}
            {/* <ul className="space-y-8">
              {data.allNodeLocation.nodes &&
                data.allNodeLocation.nodes.map((location, i) => (
                  <li key={i}>
                    <Link
                      to={location.gatsbyPath}
                      className="block hover:underline focus-visible:underline"
                    >
                      <h2 className="text-2xl font-bold font-title">
                        {location.title}
                      </h2>
                    </Link>
                    <p>
                      {parse(
                        shortenString(
                          location?.relationships
                            ?.field_associated_guidebook_entry?.body
                            ?.processed ?? "",
                          300
                        )
                      )}
                    </p>
                  </li>
                ))}
            </ul> */}
            <ul className="grid items-stretch justify-center grid-cols-2 gap-8 justify-items-center lg:grid-cols-3">
              {data.allNodeLocation.nodes &&
                sortedLocations &&
                sortedLocations.map((location, i) => (
                  <li key={i}>
                    <Link
                      to={location.gatsbyPath}
                      className="block w-40 h-64 overflow-hidden transition transform rounded-md shadow md:w-64 md:h-72 hover:scale-105 focus-visible:scale-105 bg-slate-200"
                    >
                      {location?.relationships?.field_associated_guidebook_entry
                        ?.relationships?.field_image &&
                        location?.relationships
                          ?.field_associated_guidebook_entry?.field_image && (
                          <img
                            className="object-cover object-center w-full h-40 md:h-48"
                            src={`https://secretpittsburgh.pitt.edu${location?.relationships?.field_associated_guidebook_entry?.relationships?.field_image[0]?.uri?.url}
                            `}
                            alt={
                              location?.relationships
                                ?.field_associated_guidebook_entry
                                ?.field_image[0]?.alt
                            }
                          />
                        )}

                      <h2 className="flex flex-col justify-center h-24 p-4 font-bold leading-snug md:text-lg md:leading-snug md:h-24 font-title text-ellipsis">
                        {location.title}
                      </h2>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <button
            onClick={() => scrollTo("#page-top")}
            className="flex items-center justify-center px-4 py-2 space-x-2 font-bold text-center text-black transition transform rounded shadow hover:text-black bg-slate-200 hover:scale-105"
          >
            <FaArrowUp />
            <span>Back to Top</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default ListViewPage;

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
