import React from 'react'
import PropTypes from 'prop-types'
import Head from 'react-helmet'

const Html = (props) => {
  const helmet = Head.renderStatic()

  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.style.toComponent()}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        {props.body}
        {props.state}
        {props.script}
      </body>
    </html>
  )
}

Html.propTypes = {
  body: PropTypes.any,
  state: PropTypes.any,
  script: PropTypes.any
}

export default Html
