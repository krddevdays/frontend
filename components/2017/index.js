import React from 'react'
import styled from 'styled-components'

import Wrapper from '../Wrapper'
import Header from './Header'

const Container = styled.div`
  flex-grow: 1;
  padding: 1rem 0;
  text-align: center;
  background: #252525;
  color: white;
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
    <Header />
    <Container>
      Здесь должна быть реклама, но у нас нет спонсоров,<br />
      да и вообще мы еще не утвердили список докладов.<br />
      Все будет, не волнуйтесь, но чуть позже.<br />
      <br />
      Если вы хотите выступить или стать партнером/спонсором<br />
      пишите на <Link href='mailto:mark@krddevdays.ru'>mark@krddevdays.ru</Link>
    </Container>
  </Wrapper>
)

export default Landing2017
