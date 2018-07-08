import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

export default function MarkdownPage ({data: {markdownRemark: {frontmatter, html}}}) {
  return (
    <Fragment>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>
      <div
        dangerouslySetInnerHTML={{__html: html}}
      />
    </Fragment>
  )
}

MarkdownPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired,
      html: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
