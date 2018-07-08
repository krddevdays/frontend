import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'

const Container = styled.div`
  padding-top: 70px;
`

const Logo = styled.img.attrs({
  src: require('../images/logo.svg'),
  alt: 'Krasnodar Dev Days',
  title: 'Krasnodar Dev Days'
})``

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  height: 70px;
  width: 100%;
  
  background: #252525;
`

const HeaderTop = styled.div`
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
  
  text-align: center;
  
  > ${Logo} {
    height: 100%;
  }
`

const Main = styled.main`
  margin: 1em auto;
  padding: 0 1em;
  max-width: 740px;
  box-sizing: content-box;
`

const IndexLayout = ({children}) => (
  <Container>
    <Helmet>
      <html lang='ru' />
      <title>Krasnodar Dev Days</title>
    </Helmet>
    <Header>
      <HeaderTop>
        <Logo />
      </HeaderTop>
    </Header>
    <Main>
      {children()}
    </Main>
  </Container>
)

IndexLayout.propTypes = {
  children: PropTypes.func
}

export default IndexLayout
