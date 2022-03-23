import React, { useState } from "react";
import parse from "html-react-parser";
import { graphql, Link } from "gatsby";
import "mapbox-gl/dist/mapbox-gl.css";
import { Carousel } from "antd";
import { FaArrowLeft, FaNewspaper } from "react-icons/fa";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../../components/seo";
import { getNodeText, shortenString } from "../../util";
// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const LocationPage = (props) => {
  const [location, setLocation] = useState(props.data.nodeLocation);
  const [drawer, setDrawer] = useState("");

  const essays = location?.relationships?.node__article
    ? location?.relationships?.node__article.filter(
        (article, i, self) =>
          i === self.findIndex((t) => t.title === article.title)
      )
    : null;

  console.log(essays);

  console.log(props);
  return (
    <main>
      <Seo
        title={location?.title}
        // Parse location information and insert it as site description (157 string length because ellipsis added at end)
        description={
          location?.relationships?.field_associated_guidebook_entry?.body
            ?.processed
            ? shortenString(
                getNodeText(
                  parse(
                    location?.relationships?.field_associated_guidebook_entry
                      ?.body?.processed ?? ""
                  )
                ),
                157
              )
            : null
        }
      />
      <header className="absolute z-50 flex justify-center w-full max-w-3xl transform -translate-x-1/2 top-8 left-1/2">
        <Link
          to="/?back=true"
          aria-label="Go back to homepage"
          className="absolute text-lg transform -translate-y-1/2 lg:text-xl left-8 top-1/2"
        >
          <FaArrowLeft />
        </Link>
        <h1 className="px-4 py-2 text-lg font-bold rounded shadow w-min lg:text-2xl xl:text-3xl bg-slate-200">
          <Link to="/" className="inline-block font-title whitespace-nowrap">
            Secret Pittsburgh
          </Link>
        </h1>
      </header>

      <section className="container relative flex flex-col justify-center min-h-screen pt-32 pb-24 mx-auto ">
        <div className="w-full max-w-3xl px-4 mx-auto space-y-8 leading-loose">
          {location?.relationships?.field_associated_guidebook_entry
            ?.relationships &&
            location?.relationships?.field_associated_guidebook_entry
              ?.relationships.field_image.length > 0 && (
              <Carousel
                style={{ margin: "0 auto", padding: "0" }}
                autoplay
                arrows={true}
                pauseOnHover={false}
                className="shadow-lg"
              >
                {location?.relationships.field_associated_guidebook_entry.relationships.field_image.map(
                  (image, i) => (
                    // Extra div needed so there is no extra padding underneath the figure in the carousel
                    <div key={i}>
                      <figure className="relative block w-full group">
                        <img
                          className="object-cover w-full rounded carousel-image"
                          src={`https://secretpittsburgh.pitt.edu/${image.uri.url}`}
                          alt={
                            location?.relationships
                              .field_associated_guidebook_entry.field_image[i]
                              .alt
                          }
                        />
                        <figcaption className="absolute bottom-0 left-0 px-4 pt-4 pb-6 text-white transition duration-300 transform -translate-x-16 bg-black opacity-0 group-hover:translate-x-0 max-w-prose group-hover:opacity-80">
                          {
                            location?.relationships
                              .field_associated_guidebook_entry.field_image[i]
                              .alt
                          }
                        </figcaption>
                      </figure>
                    </div>
                  )
                )}
              </Carousel>
            )}
          <h2 className="text-3xl font-bold">{location?.title}</h2>

          {/* TODO: Possible toggle buttons? */}
          {/* <div className="flex items-center space-x-4">
            <button className="flex items-center justify-center w-32 px-4 py-2 space-x-2 font-bold text-center text-black transition transform rounded shadow hover:text-black bg-slate-200 hover:scale-105">
              <span>About</span> <FaInfoCircle />
            </button>
            <button className="flex items-center justify-center w-32 px-4 py-2 space-x-2 font-bold text-center text-black transition transform rounded shadow hover:text-black bg-slate-200 hover:scale-105">
              <span>Articles</span> <FaNewspaper />
            </button>
          </div> */}
          <div className="space-y-2 leading-loose processed-text xl:leading-loose xl:text-lg">
            {parse(
              location?.relationships?.field_associated_basic_info_entr?.body
                ?.processed ?? ""
            )}
          </div>
          {location?.relationships?.field_associated_basic_info_entr?.body
            ?.processed === undefined &&
            essays === null && (
              <div className="space-y-2">
                <p className="leading-loose xl:leading-loose xl:text-lg">
                  Oops! Looks like this is an empty location
                </p>
                <Link
                  to="/"
                  className="inline-block px-4 py-2 font-bold text-center text-white transition transform rounded shadow hover:text-white bg-pitt-blue hover:scale-105"
                >
                  Go Back Home
                </Link>
              </div>
            )}
          {/* {location?.relationships?.node__article && (
            <div className="space-y-4">
              <h3 className="font-bold">Read Articles</h3>
              <div className="grid grid-cols-3 gap-8">
                {location?.relationships?.node__article?.map((article, i) => (
                  <Link
                    key={i}
                    to={article.gatsbyPath}
                    className="flex items-center justify-between p-4 space-x-4 font-bold transition transform rounded shadow hover:scale-105 hover:underline bg-slate-200 focus-visible:scale-105 focus-visible:underline"
                  >
                    <span>{article.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )} */}
          <div className="space-y-8 leading-loose processed-text xl:leading-loose xl:text-lg">
            {parse(
              location?.relationships?.field_associated_guidebook_entry?.body
                ?.processed ?? ""
            )}
          </div>
          {location?.relationships?.node__article && (
            <div className="space-y-4">
              <h3 className="font-bold">Read More Articles</h3>
              {essays !== null &&
                essays.map((article, i) => (
                  <Link
                    key={i}
                    to={article.gatsbyPath}
                    className="flex items-center justify-between p-4 space-x-4 text-lg font-bold transition transform rounded hover:scale-105 bg-slate-200 lg:text-2xl"
                  >
                    <span>{article.title}</span>
                    <FaNewspaper />
                  </Link>
                ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default LocationPage;

export const query = graphql`
  query ($id: String) {
    nodeLocation(id: { eq: $id }) {
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
          gatsbyPath(filePath: "/article/{nodeArticle.title}")
          title
        }
      }
      gatsbyPath(filePath: "/location/{nodeLocation.title}")
    }
  }
`;
