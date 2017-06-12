import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

const Head = (props) => (
  <Helmet>
    <html lang='ru' />
    <title>{props.title}</title>
    <meta charSet='utf-8' />
    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
  </Helmet>
)

Head.defaultProps = {
  title: 'Krasnodar Dev Days'
}

Head.propTypes = {
  title: PropTypes.string
}

export default Head
