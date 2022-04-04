import React from "react";
import parse from "html-react-parser";
import { graphql, Link } from "gatsby";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaArrowLeft, FaArrowUp, FaInstagram, FaTwitter } from "react-icons/fa";
import scrollTo from "gatsby-plugin-smoothscroll";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../components/seo";
import AboutImage from "../images/secret_pittsburgh_about.jpg";

// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const AboutPage = ({ data }) => {
  return (
    <main>
      <Seo title="About" />
      <header
        className="absolute z-50 flex justify-center w-full max-w-3xl transform -translate-x-1/2 top-8 left-1/2"
        id="page-top"
      >
        <Link
          to="/"
          state={{ back: true }}
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
        <div className="w-full max-w-3xl px-4 mx-auto space-y-8 leading-loose">
          <img
            className="object-cover w-full rounded shadow-lg carousel-image"
            src={AboutImage}
            alt="Students of the University of Pittsburgh Secret Pittsburgh class"
          />
          <h2 className="text-3xl font-bold font-title">
            About Us and Our Mission
          </h2>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/secretpittsburgh/?hl=en"
              className="flex items-center justify-center px-2 py-2 space-x-2 text-sm font-bold text-center text-black transition transform rounded shadow md:px-4 md:text-base hover:text-black bg-slate-200 hover:scale-105"
            >
              <FaInstagram />
              <span>Follow Our Instagram</span>
            </a>
            <a
              href="https://twitter.com/Secret_PGH?s=20&t=Hai0p_eXqekpzlkH2_XYvQ"
              className="flex items-center justify-center px-2 py-2 space-x-2 text-sm font-bold text-center text-black transition transform rounded shadow md:px-4 md:text-base hover:text-black bg-slate-200 hover:scale-105"
            >
              <FaTwitter />
              <span>Follow Our Twitter</span>
            </a>
          </div>
          <div className="space-y-8 leading-loose processed-text xl:leading-loose xl:text-lg">
            {data.nodePage.body.processed &&
              parse(data.nodePage.body.processed)}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => scrollTo("#page-top")}
              className="flex items-center justify-center px-4 py-2 space-x-2 font-bold text-center text-black transition transform rounded shadow hover:text-black bg-slate-200 hover:scale-105"
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

export default AboutPage;

export const query = graphql`
  {
    nodePage(title: { eq: "About" }) {
      title
      body {
        processed
      }
    }
  }
`;
