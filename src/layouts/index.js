import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    margin: 0;
  }
`

const Container = styled.div`
  padding-top: 70px;
  
  @media (min-width: 768px) {
    padding-top: 0;
    padding-left: 268px;
  }
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
  height: 70px;
  width: 100%;
  
  background: #252525;
  
  @media (min-width: 768px) {
    width: 268px;
    height: 100%;
  }
`

const HeaderTop = styled.div`
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
  
  text-align: center;
  
  > ${Logo} {
    height: 100%;
  }
  
  @media (min-width: 768px) {
    padding: 0;
    margin: 30px;
    height: auto;
    
    > ${Logo} {
        height: auto;
      }
  }
`

const Main = styled.main`
  margin: 1em;
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
