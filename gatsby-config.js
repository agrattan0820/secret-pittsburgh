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
        icon: "src/images/icon.png",
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
