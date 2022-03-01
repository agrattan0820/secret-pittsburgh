import React, { useState } from "react";
import parse from "html-react-parser";
import { graphql, Link, navigate } from "gatsby";
import "mapbox-gl/dist/mapbox-gl.css";
import { Carousel } from "antd";
import { FaArrowLeft } from "react-icons/fa";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../../components/seo";
// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const ArticlePage = (props) => {
  const [article, setArticle] = useState(props.data.nodeArticle);

  console.log(props);

  return (
    <main>
      <Seo />
      <header className="absolute z-50 flex justify-center w-full max-w-3xl transform -translate-x-1/2 top-8 left-1/2">
        {article?.relationships?.node__location && (
          <Link
            to={article?.relationships?.node__location[0].gatsbyPath}
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
        <div className="w-full max-w-3xl px-4 mx-auto space-y-8 leading-loose">
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
                  <img
                    key={i}
                    className="object-cover w-full h-72 md:h-96 carousel-image"
                    src={`https://secretpittsburgh.pitt.edu/${image?.uri?.url}`}
                    alt={article?.field_image[i]?.alt}
                  />
                ))}
              </Carousel>
            )}
          <h2 className="text-3xl font-bold">{article?.title}</h2>
          <div className="space-y-8 leading-loose xl:leading-loose xl:text-lg">
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
