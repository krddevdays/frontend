import React from 'react'
import styled from 'styled-components'
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light'
import js from 'react-syntax-highlighter/dist/languages/javascript'
import { hybrid } from 'react-syntax-highlighter/dist/styles'

import Image from '../../Image'

registerLanguage('javascript', js)

const Container = styled.div`
  flex: 0 0 100%;
  background: linear-gradient(145deg, #b07ec5, #55e3ca);
  color: white;
  width: 100vw;
  padding: 2rem 1rem;
`

const Logo = styled.div`
  text-align: center;
`

const Text = styled.p`
  margin: 2rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`

const Information = styled.div`
  margin: 2rem auto;
  width: 100%;
  max-width: 600px;
`

const Header = () => (
  <Container>
    <Logo>
      <Image src={require('./text.svg')} height='100px' />
    </Logo>
    <Text>
      Конференция для разработчиков<br />
    </Text>
    <Information>
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
          WebkitOverflowScrolling: 'touch',
          tabSize: 2
        }
      }}>
        {
          'const name = \'Krasnodar Dev Days #2\'\n' +
          '// 17 сентября 2017 года, 10:00\n' +
          'const date = new Date(2017, 9, 17, 10, 0, 0, 0)\n' +
          'const ticketsCount = 250\n' +
          '// г. Краснодар, ул. Гимназическая 65 (БЦ Централь)\n' +
          'const place = {lat: 45.025372, long: 38.971086}\n' +
          '\n' +
          'const subjects = [\n' +
          '\t\'Front-end\',\n' +
          '\t\'Back-end\',\n' +
          '\t\'Mobile\',\n' +
          '\t\'DevOps\'\n' +
          ']'
        }
      </SyntaxHighlighter>
    </Information>
  </Container>
)

export default Header
