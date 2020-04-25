module.exports = {
  siteMetadata: {
    title: `The Groove of Life`,
    description: `Conway's Game of Life with sound`,
    author: `jadowityherbatnik`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@src": "src",
          "@components": "src/components",
          "@hooks": "src/components/hooks",
          "@reducer": "src/reducer",
          "@common": "src/components/common",
          "@pages": "src/pages",
          "@home": "src/components/home",
          "@settings": "src/components/home/settings",
          "@tutorial": "src/components/home/tutorial",
          "@about": "src/components/about",
          "@utils": "src/utils",
          "@styles": "src/styles",
          "@helpers": "src/helpers",
        },
        extensions: ["js"],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-transition-link`,
      options: { layout: require.resolve(`./src/components/common/Layout.js`) },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Geo`, `400`],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Game of Life`,
        short_name: `The Game of Life`,
        start_url: `/`,
        background_color: `#cc8125`,
        theme_color: `#cc8125`,
        display: `standalone`,
        icon: `src/images/note.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
};
