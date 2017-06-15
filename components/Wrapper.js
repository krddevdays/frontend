import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Head from './Head'
import YandexMetrika from './YandexMetrika'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  display: flex;
  flex: 1 0 100%;
`

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
