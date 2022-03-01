import React, { useState } from "react";
import parse from "html-react-parser";
import { graphql, Link } from "gatsby";
import "mapbox-gl/dist/mapbox-gl.css";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../../components/seo";
import Pin from "../../components/pin";
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
      <section className="container relative flex flex-col justify-center h-screen mx-auto ">
        <div className="mx-auto space-y-8 max-w-prose">
          <h2 className="text-3xl font-bold">{location?.title}</h2>
          {parse(
            shortenString(
              location?.relationships?.field_associated_guidebook_entry?.body
                ?.processed ?? "",
              550
            )
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
