import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Head from './Head'
import YandexMetrika from './YandexMetrika'

const Container = styled.div([])

const Wrapper = (props) => (
  <Container>
    <Head />
    <YandexMetrika />
    {props.children}
  </Container>
)

Wrapper.propTypes = {
  children: PropTypes.any
}

export default Wrapper
