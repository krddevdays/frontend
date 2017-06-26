import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Head from './Head'
import YandexMetrika from './YandexMetrika'

const Container = styled.div`
  flex: 1 0 100%;
  display: flex;
  flex-direction: column;
`

const Wrapper = (props) => (
  <Container>
    <Head />
    {props.children}
    <YandexMetrika />
  </Container>
)

Wrapper.propTypes = {
  children: PropTypes.any
}

export default Wrapper
