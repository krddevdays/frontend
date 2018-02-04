module.exports = {
  siteMetadata: {
    title: 'Krasnodar Dev Days'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-next',
    {
      resolve: 'gatsby-plugin-facebook-pixel',
      options: {
        pixelId: '1948331748778465'
      }
    },
    {
      resolve: 'gatsby-plugin-yandex-metrika',
      options: {
        trackingId: '44994376',
        webvisor: true,
        trackHash: true
      }
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: 'https://81c5d87ac8dc43d289508f0ee84c6027:b9867a8f58e34fc08001eb4f48905c7c@sentry.io/197348'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify'
  ]
}
