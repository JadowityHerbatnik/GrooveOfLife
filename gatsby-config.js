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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Groove of Life`,
        short_name: `The Groove of Life`,
        start_url: `/`,
        background_color: `#3c3836`,
        theme_color: `#3c3836`,
        display: `standalone`,
        icon: `src/images/note.png`, // This path is relative to the root of the site.
      },
    },
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
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Geo`, `400`, `Press Start 2P`, `400`],
        display: "swap",
      },
    },
    `gatsby-plugin-offline`,
  ],
};
