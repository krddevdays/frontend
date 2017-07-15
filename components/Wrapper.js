import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Head from './Head'

const Container = styled.div`
  min-height: 100vh;
  flex: 1 0 100%;
  display: flex;
  flex-direction: column;
`

const Wrapper = (props) => (
  <Container>
    <Head />
    {props.children}
  </Container>
)

Wrapper.propTypes = {
  children: PropTypes.any
}

export default Wrapper
