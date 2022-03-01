import React, { useState } from "react";
import parse from "html-react-parser";
import { graphql, Link } from "gatsby";
import "mapbox-gl/dist/mapbox-gl.css";
import { Carousel } from "antd";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../../components/seo";
import { shortenString } from "../../util";
// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const LocationPage = (props) => {
  const [location, setLocation] = useState(props.data.nodeLocation);

  console.log(props);
  return (
    <main>
      <Seo />
      <h1 className="absolute z-50 px-4 py-2 text-lg font-bold transform -translate-x-1/2 rounded w-min lg:text-2xl bg-slate-200 top-8 left-1/2">
        <Link to="/" className="inline-block font-title whitespace-nowrap">
          Secret Pittsburgh
        </Link>
      </h1>
      <section className="container relative flex flex-col justify-center min-h-screen pt-32 pb-24 mx-auto ">
        <div className="w-full max-w-2xl px-4 mx-auto space-y-8 leading-loose">
          <Carousel
            style={{ margin: "auto" }}
            autoplay
            arrows={true}
            pauseOnHover={false}
          >
            {location?.relationships.field_associated_guidebook_entry.relationships.field_image.map(
              (image, i) => (
                <img
                  className="object-cover h-72 md:h-96 carousel-image"
                  src={`https://secretpittsburgh.pitt.edu/${image.uri.url}`}
                  alt={
                    location?.relationships.field_associated_guidebook_entry
                      .field_image[i].alt
                  }
                />
              )
            )}
          </Carousel>
          <h2 className="text-3xl font-bold">{location?.title}</h2>
          {parse(
            location?.relationships?.field_associated_guidebook_entry?.body
              ?.processed ?? ""
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
          title
        }
      }
      gatsbyPath(filePath: "/location/{nodeLocation.title}")
    }
  }
`;
