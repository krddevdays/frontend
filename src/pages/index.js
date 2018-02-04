import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background-color: #55e3ca;
  background-image: linear-gradient(145deg, #b07ec5, #55e3ca);
  color: white;
  padding: 1rem;
`

const Title = styled.h1`
  text-align: center;
  margin: 0.5rem 0;
  user-select: none;
`

const Subtitle = styled.h2`
  margin: 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
`

export default () => (
  <Container>
    <Helmet>
      <title>Krasnodar Dev Days</title>
      <meta
        property='og:description'
        content='Сообщество разработчиков Краснодара и края'
      />
      <meta
        property='og:image'
        content={require('../images/og.png')}
      />
    </Helmet>
    <Title>
      <img
        src={require('../images/textLogo.svg')}
        height='100'
        width='226'
        alt='Krasnodar Dev Days'
        title='Krasnodar Dev Days' />
    </Title>
    <Subtitle>
      Сообщество разработчиков
    </Subtitle>
  </Container>
)
