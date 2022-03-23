import React from "react";
import parse from "html-react-parser";
import { graphql, Link } from "gatsby";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaArrowLeft, FaArrowUp, FaBookOpen } from "react-icons/fa";
import scrollTo from "gatsby-plugin-smoothscroll";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../components/seo";
import BookshelfImage from "../images/secret_pittsburgh_bookshelf.jpg";

// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const AboutPage = ({ data }) => {
  console.log(data);
  return (
    <main>
      <Seo />
      <header
        className="absolute z-50 flex justify-center w-full max-w-3xl transform -translate-x-1/2 top-8 left-1/2"
        id="page-top"
      >
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
          <img
            className="object-cover w-full rounded shadow-lg carousel-image"
            src={BookshelfImage}
            alt="Old book from the Historic Pittsburgh Archive"
          />
          <h2 className="text-3xl font-bold" id="page-top">
            Bookshelf of Sources
          </h2>
          <div className="space-y-16 leading-loose xl:leading-loose xl:text-lg">
            <p>
              Welcome to Secret Pittsburgh's bookshelf! This contains books,
              films, photos, and even audio clips relating to the Secret
              Pittsburgh course. While some entries are about Pittsburgh, not
              all of them are. Instead, this list compiles anything that has
              been taught in the class over the years.
            </p>
            <ul className="space-y-8">
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
                    {/* <li
                      key={i}
                      className="h-64 p-4 font-bold border-l-8 font-title w-52 rounded-r-md bg-slate-200 border-l-slate-900"
                    >
                      {book?.title}
                    </li> */}
                  </>
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

export default AboutPage;

export const query = graphql`
  {
    allNodeBookshelfItem(sort: { order: ASC, fields: field_author_lastname }) {
      nodes {
        body {
          processed
        }
        field_author_firstname
        field_author_lastname
        field_place_of_publication
        field_publication_date
        field_publisher
        field_title_of_containing_journa
        field_page_range
        field_additional_authors
        title
      }
    }
  }
`;
