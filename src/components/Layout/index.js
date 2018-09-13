import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {StaticQuery, graphql} from 'gatsby'
import {injectGlobal} from 'styled-components'

import 'normalize.css'

injectGlobal`
  html {
    font-family: 'Montserrat', sans-serif;
  }
  @media screen and (max-width: 320px) {
    html {
      word-wrap: break-word;
      -webkit-hyphens: auto;
      -moz-hyphens: auto;
      hyphens: auto;
    }
  }
`

const Layout = ({children}) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet>
          <title>{data.site.siteMetadata.title}</title>
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700,900&amp;subset=cyrillic"
            rel="stylesheet"
          />
          <html lang="ru" />
        </Helmet>
        {children}
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
