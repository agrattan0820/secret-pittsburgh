import React, { useState } from "react";
import parse from "html-react-parser";
import { graphql, Link } from "gatsby";
import "mapbox-gl/dist/mapbox-gl.css";
import { Carousel } from "antd";
import { FaArrowLeft, FaShare, FaArrowUp, FaLink } from "react-icons/fa";
import scrollTo from "gatsby-plugin-smoothscroll";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../../components/seo";
import { getNodeText, replaceStagingLink, shortenString } from "../../util";
// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const ArticlePage = (props) => {
  const [article, setArticle] = useState(props.data.nodeArticle);
  const [copying, setCopying] = useState(false);

  // Function for share button that either copies the link to clipboard or activates the mobile share if available
  const shareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${article.title} | Secret Pittsburgh`,
          url: props.location.href,
        })
        .then(() => {
          console.log(`Thanks for sharing!`);
        })
        .catch(console.error);
    } else {
      const cb = navigator.clipboard;
      if (copying) {
        setCopying(false);
      }
      cb.writeText(props.location.href)
        .then(() => {
          setCopying(true);
        })
        .catch(console.error);
    }
  };

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
      <header
        className="absolute z-50 flex justify-center w-full max-w-3xl transform -translate-x-1/2 top-8 left-1/2"
        id="page-top"
      >
        <Link
          to={
            article?.relationships?.node__location
              ? article?.relationships?.node__location[0].gatsbyPath
              : "/"
          }
          aria-label="Go back to homepage"
          className="absolute text-lg transition transform -translate-y-1/2 focus-visible:scale-105 lg:text-xl left-8 top-1/2"
        >
          <FaArrowLeft />
        </Link>
        <h1 className="px-4 py-2 text-lg font-bold text-white rounded shadow w-min lg:text-2xl xl:text-3xl bg-pitt-blue">
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
                className="shadow-lg"
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
          <h2 className="mt-8 mb-4 text-3xl font-bold">{article?.title}</h2>
          {article?.field_author_name && (
            <p className="mb-8 italic xl:text-lg">
              By {article?.field_author_name}
            </p>
          )}
          <div className="mb-4 space-y-8 leading-loose processed-text xl:leading-loose xl:text-lg">
            {parse(replaceStagingLink(article?.body?.processed ?? ""))}
          </div>
          <div className="flex space-x-4">
            <div className="relative z-10">
              <button
                onClick={shareLink}
                className="flex items-center justify-center w-32 px-4 py-2 font-bold text-center text-black transition transform rounded shadow hover:text-black bg-slate-200 hover:scale-105 focus-visible:scale-105"
              >
                <span className="mr-2">Share</span> <FaShare />
              </button>
              <div
                // Role alert and aria-live announce to screen readers
                role="alert"
                aria-live="polite"
                className={`max-w-3xl z-10 absolute origin-center top-0 font-bold left-1/2 px-4 py-2 w-56 text-sm text-center bg-pitt-blue text-white rounded-md shadow pointer-events-none share-popup ${
                  copying && "animate-popup"
                }`}
              >
                <p className={`${!copying && "hidden"} flex items-center`}>
                  URL Copied to Clipboard <FaLink className="ml-2" />
                </p>
              </div>
            </div>
            <button
              onClick={() => scrollTo("#page-top")}
              className="flex items-center justify-center px-4 py-2 space-x-2 font-bold text-center text-black transition transform rounded shadow hover:text-black bg-slate-200 hover:scale-105 focus-visible:scale-105"
            >
              <FaArrowUp />
              <span>Back to Top</span>
            </button>
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
