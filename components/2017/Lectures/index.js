import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Section from '../Section'
import Text from '../Text'
import Button from '../Button'
import * as colors from '../colors'

const background = {
  'light': colors.black,
  'dark': colors.white,
  'gradient': colors.black
}

const color = {
  'light': colors.white,
  'dark': colors.black,
  'gradient': colors.white
}

const Heading = require('../Heading').default.withComponent('h3')

const Lecture = styled(({className, title, lecturer, photo, href}) => (
  <div className={className}>
    {photo && <img src={photo} alt={lecturer} title={lecturer} />}
    <span>
      <span>{lecturer}</span>
      <span>{title}</span>
      {href && <a href={href} target='_blank'>Подробнее</a>}
    </span>
  </div>
))`
  text-decoration: none;
  margin: 0.5rem 0;
  display: block;
  background: ${props => background[props.theme.color]};
  color: ${props => color[props.theme.color]};
  opacity: 1;
  transition: opacity 0.2s;
 
  &:last-child {
    margin-bottom: 0;
  }
  
  &:first-child {
    margin-top: 0;
  }
  
  > img {
    float: left;
    height: 5rem;
    width: 5rem;
  }
  
  > span {
    display: block;
    margin: 0 0 0 5rem;
    padding: 0.5rem;
    line-height: 1.5rem;
    
    > span {
      display: block;
    }
    
    > span:first-child {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  
    > a {
      color: ${props => color[props.theme.color]};
    }
  }
  
  &:after {
    display: table;
    content: "";
    clear:both;
  }
`

const Container = styled(Text.withComponent('div'))`
  max-width: 768px;
  width: 100%;
  margin: 1rem auto;
  padding: 0 0.5rem;
`

export default () => (
  <ThemeProvider theme={{color: 'dark'}}>
    <Section>
      <Heading>Доклады</Heading>
      <Container>
        <Lecture
          lecturer='Андрей Солодовников'
          photo={require('./Solodovnikov.jpg')}
          title='Nuxt.js — фреймворк для приложений на Vue.js'
          href='http://mailchi.mp/0b94f8e2f05e/nuxtjs'
        />
        <Lecture
          lecturer='Евгений Хашин'
          photo={require('./Khashin.jpg')}
          title='Построение высокопроизводительного отказоустойчивого хранилища для Big Data и Stateful сервисов'
          href='http://mailchi.mp/cffbb201de97/big-data-stateful'
        />
        <Lecture
          lecturer='Иван Муратов'
          photo={require('./Muratov.jpg')}
          title='Тест Джоэла Спольски. 20 лет спустя. Наши дни.'
          href='http://mailchi.mp/6fd2d4dbdf8c/20'
        />
        <Lecture
          lecturer='Александр Иванов'
          photo={require('./Ivanov.jpg')}
          title='get git'
          href='http://mailchi.mp/ab74ce7805e4/get-git'
        />
        <Lecture
          lecturer='Денис Сальников'
          photo={require('./Salnikov.jpg')}
          title='Кросс-функциональные команды и самоорганизация в основе Agile'
          href='http://mailchi.mp/8a09c4670b20/agile'
        />
        <Lecture
          lecturer='Ник Ков'
          photo={require('./Kov.jpg')}
          title='Realm vs CoreData'
          href='http://mailchi.mp/c7a4aa1f0b90/realm-vs-coredata'
        />
        <Lecture
          lecturer='Виктор Тыщенко'
          photo={require('./ViktorT.jpg')}
          title='Зачем мне Python?'
          href='http://mailchi.mp/6830eafaa86b/python'
        />
        <Lecture
          lecturer='Павел Колмаков'
          photo={require('./PavelK.jpg')}
          title='WinDbg & Co. : отладка .Net приложений'
          href='http://mailchi.mp/0f50381f676d/windbg-co-net'
        />
      </Container>
      <Text align='center'>
        <Button
          href='https://krddevdays.timepad.ru/event/512166/?utm_refcode=4c6b52e5f714cf8bad3b8033eb3344a85090149b'
          color='gradient'>
          Приобрести билет
        </Button>
      </Text>
    </Section>
  </ThemeProvider>
)
