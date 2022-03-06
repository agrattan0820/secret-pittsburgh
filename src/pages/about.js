import React from "react";
import parse from "html-react-parser";
import { graphql, Link } from "gatsby";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaArrowLeft } from "react-icons/fa";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../components/seo";
import AboutImage from "../images/secret_pittsburgh_about.jpg";

// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const AboutPage = ({ data }) => {
  console.log(data);
  return (
    <main>
      <Seo />
      <header className="absolute z-50 flex justify-center w-full max-w-3xl transform -translate-x-1/2 top-8 left-1/2">
        <Link
          to="/?back=true"
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
            src={AboutImage}
            alt="Students of the University of Pittsburgh Secret Pittsburgh class"
          />
          <h2 className="text-3xl font-bold">About Us and Our Mission</h2>
          <div className="space-y-8 leading-loose xl:leading-loose xl:text-lg">
            {data.nodePage.body.processed &&
              parse(data.nodePage.body.processed)}
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
