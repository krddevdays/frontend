import React from 'react'
import styled from 'styled-components'
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light'
import js from 'react-syntax-highlighter/dist/languages/javascript'
import { hybrid } from 'react-syntax-highlighter/dist/styles'

import Image from '../../Image'
import Button from '../Button'
import Text from '../Text'

registerLanguage('javascript', js)

const calendarQueryString = require('querystring').stringify({
  f: 'm',
  'e[0][date_start]': '2017-09-17 10:00:00',
  'e[0][date_end]': '2017-09-17 20:00:00',
  'e[0][timezone]': 'Europe/Moscow',
  'e[0][title]': 'Krasnodar Dev Days #2',
  'e[0][description]': 'Конференция для разработчиков',
  'e[0][location]': 'г. Краснодар, ул. Гимназическая 65',
  'e[0][organizer]': 'Krasnodar Dev Days',
  'e[0][organizer_email]': 'mark@krddevdays.ru',
  'e[0][privacy]': 'public'
})

const Container = styled.main`
  flex-shrink: 0;
  background-color: #55e3ca;
  background-image: linear-gradient(145deg, #b07ec5, #55e3ca);
  color: white;
  padding: 2rem 1rem;
  box-shadow: 0 0.125rem 1.25rem rgba(0, 0, 0, 0.2);
`

const Title = styled.h1`
  text-align: center;
  margin: 1rem 0 2rem;
`

const Subtitle = styled.h2`
  margin: 2rem 0;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
`

const Information = styled.div`
  margin: 2rem auto;
  max-width: 600px;
`

const Buttons = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > ${Button} {
    margin-top: 1rem;
  }

  > ${Button}:first-child {
    margin-top: 0;
  }

  @media (min-width: 768px) {
    flex-direction: row;

    > ${Button} {
      margin-top: 0;
    }
  }
`

const Header = () => (
  <Container>
    <Title>
      <Image src={require('./text.svg')} height='100' width='226' alt='Krasnodar Dev Days' title='Krasnodar Dev Days' />
    </Title>
    <Subtitle>
      Конференция для разработчиков
    </Subtitle>
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
          '// Билеты по 750 рублей'
        }
      </SyntaxHighlighter>
    </Information>
    <Buttons>
      <Button
        href='https://krddevdays.timepad.ru/event/512166/?utm_refcode=4c6b52e5f714cf8bad3b8033eb3344a85090149b'
        color='light'>
        Приобрести билет
      </Button>
      <Button href='http://eepurl.com/cPFwj9' target='_blank'>Подписаться на рассылку</Button>
    </Buttons>
    <Text align='center'>Добавить в календарь:</Text>
    <Buttons>
      <Button
        href={`http://addtocalendar.com/atc/ical?${calendarQueryString}`}
        target='_blank'
        textTransform='inherit'>
        iCalendar
      </Button>
      <Button
        href={`http://addtocalendar.com/atc/google?${calendarQueryString}`}
        target='_blank'
        textTransform='inherit'>
        Google Calendar
      </Button>
    </Buttons>
  </Container>
)

export default Header
