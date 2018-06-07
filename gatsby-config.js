module.exports = {
  siteMetadata: {
    title: 'Krasnodar Dev Days'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-next',
    {
      resolve: 'gatsby-plugin-vk-pixel',
      options: {
        id: 'VK-RTRG-140553-fXIvj'
      }
    },
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
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify'
  ]
}
