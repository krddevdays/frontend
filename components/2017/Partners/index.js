import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Section from '../Section'
import Text from '../Text'
import Button from '../Button'
import grayscale from '../grayscale'

const Heading = require('../Heading').default.withComponent('h3')

const Partner = styled(({className, href, image, name}) => (
  <a className={className} href={href} target='_blank'>
    <img src={image} alt={name} title={name} height='60px' />
  </a>
))`
  ${grayscale}
  
  display: inline-block;
  margin: 1rem;
  padding: 0;
  text-decoration: none;
  
  > img {
    vertical-align: top;
    max-width: 100%;
  }
`

export default () => (
  <ThemeProvider theme={{color: 'light'}}>
    <Section>
      <Heading>Партнеры</Heading>
      <Text align='center'>
        <Partner
          href='http://www.iidf.ru/'
          image={require('./free.png')}
          name='ФРИИ'
        />
        <Partner
          href='https://vk.com/codehipsters'
          image={require('./ch.png')}
          name='Code Hipsters'
        />
        <Partner
          href='https://vk.com/co_place'
          image={require('./co-place.svg')}
          name='Коворкинг CO-Place'
        />
      </Text>
      <Text align='center'>
        <Button href='mailto:mark@krddevdays.ru?subject=Хочу стать партнером KDD2'>Стать партнером</Button>
      </Text>
    </Section>
  </ThemeProvider>
)
