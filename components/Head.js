import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const Head = props => (
  <Helmet>
    <html lang='ru' />
    <title>Krasnodar Dev Days</title>
    <meta charSet='utf-8' />
    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
    {props.children}
  </Helmet>
)

Head.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
}

export default Head
