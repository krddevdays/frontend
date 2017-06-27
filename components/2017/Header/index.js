import React from 'react'
import styled from 'styled-components'
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light'
import js from 'react-syntax-highlighter/dist/languages/javascript'
import { hybrid } from 'react-syntax-highlighter/dist/styles'

import Image from '../../Image'

registerLanguage('javascript', js)

const Container = styled.main`
  flex-shrink: 0;
  background-color: #55e3ca;
  background-image: linear-gradient(145deg, #b07ec5, #55e3ca);
  color: white;
  padding: 2rem 1rem;
  box-shadow: 0 0.125rem 1.25rem rgba(0, 0, 0, 0.2);
`

const Logo = styled.h1`
  text-align: center;
  margin: 1rem 0 2rem;
`

const Text = styled.h2`
  margin: 2rem 0;
  font-size: 2em;
  font-weight: 600;
  text-align: center;
`

const Information = styled.div`
  margin: 2rem auto;
  max-width: 600px;
`

const Button = styled.a`
  white-space: nowrap;
  display: block;
  min-height: 2.5em;
  line-height: 2.5;
  margin: 0 0.5rem;
  padding: 0 0.875em;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background: ${props => props.white ? 'white' : '#1d1f27'};
  border-radius: 0.25em;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${props => props.white ? '#1d1f27' : 'white'};
  text-decoration: none;
  transition: box-shadow 0.15s ease, transform 0.15s ease;
  will-change: transform;
  user-select: none;

  &:hover {
    transform: translate3d(0, -1px, 0);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`

const Buttons = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > a {
    margin-top: 1rem;
  }

  @media (min-width: 768px) {
    flex-direction: row;

    > a {
      margin-top: 0;
    }
  }
`

const Header = () => (
  <Container>
    <Logo>
      <Image src={require('./text.svg')} height='100' width='226' alt='Krasnodar Dev Days' title='Krasnodar Dev Days' />
    </Logo>
    <Text>
      Конференция для разработчиков
    </Text>
    <Information>
      <SyntaxHighlighter language='javascript' style={{
        ...hybrid,
        hljs: {
          background: '#252525',
          padding: '1rem',
          margin: '0 0.5rem',
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
          'const date = new Date(2017, 8, 17, 10, 0, 0, 0)\n' +
          'const ticketsCount = 250\n' +
          '// г. Краснодар, ул. Гимназическая 65 (БЦ Централь)\n' +
          'const place = {lat: 45.025372, long: 38.971086}\n' +
          '\n' +
          'const subjects = [\n' +
          '\t\'Front-end\',\n' +
          '\t\'Back-end\',\n' +
          '\t\'Mobile\',\n' +
          '\t\'DevOps\'\n' +
          ']\n' +
          '\n' +
          '// Первые 60 билетов по 500 рублей\n' +
          '// Последующие билеты по 1000 рублей\n' +
          '// С 1 сентября билеты по 1500 рублей'
        }
      </SyntaxHighlighter>
    </Information>
    <Buttons>
      <Button href='https://krddevdays.timepad.ru/event/512166/?utm_refcode=4c6b52e5f714cf8bad3b8033eb3344a85090149b'>Приобрести билет</Button>
      <Button href='http://eepurl.com/cPFwj9' target='_blank' white>Подписаться на рассылку</Button>
    </Buttons>
  </Container>
)

export default Header
