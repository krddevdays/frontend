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
