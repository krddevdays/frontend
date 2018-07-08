module.exports = {
  siteMetadata: {
    title: 'Krasnodar Dev Days'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-next',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/media`,
        name: 'media'
      }
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-external-links',
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'media'
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 740
            }
          }
        ]
      }
    },
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
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify'
  ]
}
