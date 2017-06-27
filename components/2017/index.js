import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Wrapper from '../Wrapper'
import Header from './Header'

const Container = styled.section`
  flex-grow: 1;
  flex-shrink: 0;
  padding: 1rem 0;
  text-align: center;
  background-color: #252525;
  color: white;
`

const Text = styled.p`
  margin: 0;
  padding: 0 1rem;
`

const Link = styled.a`
  color: #26d2b4;
  transition: color 0.2s;

  &:hover {
    color: #27bfa0;
  }
`

const Landing2017 = (props) => (
  <Wrapper>
    <Helmet>
      <title>Krasnodar Dev Days #2</title>
      <meta
        property='og:description'
        content='Вторая full-day конференция разработчиков в Краснодаре. Front-end, Back-end, Mobile, DevOps'
      />
      <meta
        property='og:image'
        content={require('./og.png')}
      />
    </Helmet>
    <Header />
    <Container>
      <Text>
        Здесь должна быть реклама, но&nbsp;у&nbsp;нас нет спонсоров,<br />
        да&nbsp;и&nbsp;вообще мы&nbsp;еще нe&nbsp;утвердили список докладов.<br />
        Все будет, не&nbsp;волнуйтесь, но&nbsp;чуть позже.<br />
        <br />
        Если вы&nbsp;хотите выступить или стать партнером/спонсором<br />
        пишите на <Link href='mailto:mark@krddevdays.ru'>mark@krddevdays.ru</Link>
      </Text>
    </Container>
  </Wrapper>
)

export default Landing2017
