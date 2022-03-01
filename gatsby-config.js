require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Secret Pittsburgh`,
    siteUrl: `https://secretpittsburgh.pitt.edu/`,
    description: `Welcome to Secret Pittsburgh, a digital guide to Pittsburgh created by University of Pittsburgh students!`,
    author: `University of Pittsburgh`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: `src/images/favicons/favicon-32x32.png`, // This path is relative to the root of the site.
        icons: [
          {
            src: `/images/favicons/favicon-16x16.png`,
            sizes: `16x16`,
            type: `image/png`,
          },
          {
            src: `/images/favicons/favicon-32x32.png`,
            sizes: `32x32`,
            type: `image/png`,
          },
          {
            src: `/images/favicons/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/images/favicons/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `https://secretpittsburgh.pitt.edu/sp/`,
        apiBase: `jsonapi`,
      },
    },
  ],
};
