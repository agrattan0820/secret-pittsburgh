import React, { useState } from "react";
import parse from "html-react-parser";
import { graphql, Link } from "gatsby";
import "mapbox-gl/dist/mapbox-gl.css";
import { Carousel } from "antd";
import { FaArrowLeft } from "react-icons/fa";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../../components/seo";
import { getNodeText, shortenString } from "../../util";
// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const ArticlePage = (props) => {
  const [article, setArticle] = useState(props.data.nodeArticle);

  return (
    <main>
      <Seo
        title={article?.title}
        // Parse article body and insert it as site description (157 string length because ellipsis added at end)
        description={shortenString(
          getNodeText(parse(article?.body?.processed ?? "")).replace(
            /(\r\n|\n|\r)/gm,
            ""
          ),
          157
        )}
      />
      <header className="absolute z-50 flex justify-center w-full max-w-3xl transform -translate-x-1/2 top-8 left-1/2">
        {article?.relationships?.node__location && (
          <Link
            to={article?.relationships?.node__location[0].gatsbyPath}
            aria-label="Go back to homepage"
            className="absolute text-lg transform -translate-y-1/2 lg:text-xl left-8 top-1/2"
          >
            <FaArrowLeft />
          </Link>
        )}
        <h1 className="px-4 py-2 text-lg font-bold rounded shadow w-min lg:text-2xl xl:text-3xl bg-slate-200">
          <Link to="/" className="inline-block font-title whitespace-nowrap">
            Secret Pittsburgh
          </Link>
        </h1>
      </header>

      <section className="container relative flex flex-col justify-center min-h-screen pt-32 pb-24 mx-auto ">
        <div className="w-full max-w-3xl px-4 mx-auto leading-loose">
          {article?.relationships?.field_image &&
            article?.relationships?.field_image.length > 0 && (
              <Carousel
                style={{ margin: "auto" }}
                autoplay
                arrows={true}
                pauseOnHover={false}
                className="mb-8 shadow-lg"
              >
                {article?.relationships?.field_image.map((image, i) => (
                  // Extra div needed so there is no extra padding underneath the figure in the carousel
                  <div key={i}>
                    <figure className="relative block w-full group">
                      <img
                        className="object-cover w-full carousel-image"
                        src={`https://secretpittsburgh.pitt.edu/${image?.uri?.url}`}
                        alt={article?.field_image[i]?.alt}
                      />
                      <figcaption className="absolute bottom-0 left-0 px-4 pt-4 pb-6 text-white transition duration-300 transform -translate-x-16 bg-black opacity-0 group-hover:translate-x-0 max-w-prose group-hover:opacity-80">
                        {article?.field_image[i]?.alt}
                      </figcaption>
                    </figure>
                  </div>
                ))}
              </Carousel>
            )}
          <h2 className="mb-4 text-3xl font-bold">{article?.title}</h2>
          {article?.field_author_name && (
            <p className="mb-8 italic xl:text-lg">
              By {article?.field_author_name}
            </p>
          )}
          <div className="space-y-8 leading-loose processed-text xl:leading-loose xl:text-lg">
            {parse(article?.body?.processed ?? "")}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ArticlePage;

export const query = graphql`
  query ($id: String) {
    nodeArticle(id: { eq: $id }) {
      body {
        processed
      }
      field_author_name
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
        node__location {
          gatsbyPath(filePath: "/location/{nodeLocation.title}")
        }
      }
      gatsbyPath(filePath: "/article/{nodeArticle.title}")
    }
  }
`;
