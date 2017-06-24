import React from 'react'
import styled from 'styled-components'
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light'
import js from 'react-syntax-highlighter/dist/languages/javascript'
import { hybrid } from 'react-syntax-highlighter/dist/styles'

import Wrapper from '../Wrapper'
import Image from '../Image'

registerLanguage('javascript', js)

const Header = styled.div`
  flex: 0 0 100%;
  background: linear-gradient(145deg, #b07ec5, #55e3ca);
  color: white;
  width: 100vw;
  padding: 2rem 1rem;
`

const HeaderLogo = styled.div`
  text-align: center;
`

const HeaderText = styled.p`
  margin: 2rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`

const HeaderInformation = styled.div`
  margin: 2rem auto;
  width: 100%;
  max-width: 600px;
`
const Landing2017 = (props) => (
  <Wrapper>
    <Header>
      <HeaderLogo>
        <Image src={require('./text.svg')} height='100px' />
      </HeaderLogo>
      <HeaderText>
        Конференция для разработчиков<br />
      </HeaderText>
      <HeaderInformation>
        <SyntaxHighlighter language='javascript' style={{
          ...hybrid,
          hljs: {
            background: '#1d1f27',
            padding: '1rem',
            margin: 0,
            boxShadow: '0.05rem 0.05rem 1rem rgba(0, 0, 0, 0.25)',
            cursor: 'text',
            overflow: 'hidden',
            overflowX: 'auto',
            webkitOverflowScrolling: 'touch'
          }
        }}>
          {
            'const name = \'Krasnodar Dev Days #2\'\n' +
            'const date = new Date(2017, 9, 17, 10, 0, 0, 0) // 17.09.2017 10:00:00\n' +
            'const ticketsCount = 250\n' +
            '\n' +
            'const subjects = [\'Front-end\', \'Back-end\', \'Mobile\', \'DevOps\']'
          }
        </SyntaxHighlighter>
      </HeaderInformation>
    </Header>
  </Wrapper>
)

export default Landing2017
