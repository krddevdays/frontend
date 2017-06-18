import React, { Component } from 'react'
import styled from 'styled-components'

import Section from './Section'

// language=SCSS prefix=dummy{ suffix=}
const Container = Section.extend`
  padding: 0;
  position: relative;
`

// language=SCSS prefix=dummy{ suffix=}
const Map = styled.iframe`
  display: block;
  width: 100%;
  height: 482px;
`

// language=SCSS prefix=dummy{ suffix=}
const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: transparent;
`

export default class Location extends Component {
  state = {
    overlay: true
  }

  onScrollWindow = () => {
    if (this.state.overlay === false) {
      this.setState({overlay: true})
    }
  }

  onClickOverlay = () => {
    this.setState({
      overlay: false
    })
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScrollWindow)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScrollWindow)
  }

  render () {
    return (
      <Container>
        {this.state.overlay && <Overlay onClick={this.onClickOverlay} />}
        <Map
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1409.8986434046376!2d38.97312859999998!3d45.029040400000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40f04fbca262ea4d%3A0xa0834aed65272aec!2z0JrRg9Cx0LvQvtCz!5e0!3m2!1sru!2sru!4v1478433230539'
          frameBorder='0'
          allowFullScreen
        />
      </Container>
    )
  }
}
