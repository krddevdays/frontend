import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import GatsbyLink from 'gatsby-link'

const Title = styled.h1`
  margin: 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 600;
`

const Subtitle = styled.div`
  margin: 0.5rem 0;
  font-size: 1rem;
`

const Link = styled(GatsbyLink)``

export default () => (
  <div>
    <Helmet>
      <title>Not found</title>
    </Helmet>
    <Title>
      Страница не найдена
    </Title>
    <Subtitle>
      <Link to='/'>Вернуться на главную</Link>
    </Subtitle>
  </div>
)
