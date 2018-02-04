import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import GatsbyLink from 'gatsby-link'

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
  margin: 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 600;
`

const Subtitle = styled.div`
  margin: 0.5rem 0;
  font-size: 1rem;
`

const Link = styled(GatsbyLink)`
  color: white;
`

export default () => (
  <Container>
    <Helmet>
      <title>Not found</title>
    </Helmet>
    <Title>
      Страница не найдена
    </Title>
    <Subtitle>
      <Link to='/'>Вернуться на главную</Link>
    </Subtitle>
  </Container>
)
