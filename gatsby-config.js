require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Secret Pittsburgh`,
    siteUrl: `https://secretpittsburgh.netlify.app`,
    description: `Welcome to Secret Pittsburgh, a digital guide to Pittsburgh created by University of Pittsburgh students!`,
    author: `University of Pittsburgh`,
    image: `/secret_pittsburgh_OG_image.png`,
    lang: "en",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-postcss",
    "gatsby-plugin-smoothscroll",
    "gatsby-plugin-netlify",
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
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
        tailwind: true, // Enable tailwindcss support
        purgeOnly: ["antd/dist/antd.css"], // Purge only these files/folders
        purgeCSSOptions: {
          safelist: [
            "a",
            "header",
            "footer",
            "h1",
            "h2",
            "h3",
            "input",
            "ant-select-selection-search-input",
            "ant-select-single",
            "ant-select-selector",
            "ant-select-selection-placeholder",
            "ant-select-auto-complete",
            "ant-select-allow-clear",
            "ant-select-show-search",
            "ant-select-selection-search",
            "ant-drawer",
            "ant-drawer-left",
            "ant-drawer-open",
            "ant-drawer-mask",
            "ant-drawer-content-wrapper",
            "ant-drawer-content",
            "ant-drawer-wrapper-body",
            "ant-drawer-header",
            "ant-drawer-header-title",
            "ant-drawer-close",
            "ant-drawer-title",
            "ant-drawer-body",
            "ant-carousel",
            "slick-slider",
            "slick-initialized",
            "slick-arrow",
            "slick-prev",
            "slick-list",
            "slick-track",
            "slick-slide",
            "slick-cloned",
            "slick-active",
            "slick-current",
            "slick-next",
            "slick-dots",
            "slick-dots-bottom",
          ],
        },
        // More options defined here https://purgecss.com/configuration.html#options
      },
    },
  ],
};
