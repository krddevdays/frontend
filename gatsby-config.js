module.exports = {
  siteMetadata: {
    title: `Krasnodar Dev Days #3`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-vk-pixel',
      options: {
        id: 'VK-RTRG-140553-fXIvj',
      },
    },
    {
      resolve: 'gatsby-plugin-facebook-pixel',
      options: {
        pixelId: '1948331748778465',
      },
    },
    {
      resolve: 'gatsby-plugin-yandex-metrika',
      options: {
        trackingId: '44994376',
        webvisor: true,
        trackHash: true,
      },
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: 'https://23dc5349ab574f7a8227da1499b1c38d@sentry.io/1253994',
        config:  {
          environment: process.env.CONTEXT || 'local',
          release: process.env.COMMIT_REF,
        },
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-remove-serviceworker`,
  ],
}
