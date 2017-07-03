import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Section from '../Section'
import Text from '../Text'
import Button from '../Button'
import grayscale from '../grayscale'

const Heading = require('../Heading').default.withComponent('h3')

const Speaker = styled(({className, photo, fullName}) => (
  <figure className={className} itemScope itemType='http://schema.org/Person'>
    <img src={photo} alt={fullName} title={fullName} />
    <figcaption itemProp='name'>{fullName}</figcaption>
  </figure>
))`
  ${grayscale}
  display: inline-block;
  width: 7rem;
  margin: 1rem 0.5rem;
  padding: 0;
  vertical-align: top;
  
  > img {
    display: block;
    vertical-align: top;
    margin: 1rem 0.8125rem;
    width: 5.1875rem;
    height: 5.1875rem;
    border-radius: 100%;
    border: 0.1875rem solid rgba(255, 255, 255, 0.3);
  }
  
  > figcaption {
    display: block;
    margin: 1rem 0;
    font-size: 0.85rem;
    line-height: 1.25;
    text-align: center;
    font-weight: 500;
    height: 2.5em;
  }
  
  > :last-child {
    margin-bottom: 0;
  }
  
  > :first-child {
    margin-top: 0;
  }
`

const Container = Text.withComponent('div').extend`
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
`

export default () => (
  <ThemeProvider theme={{color: 'dark'}}>
    <Section>
      <Heading>Спикеры</Heading>
      <Container align='center'>
        <Speaker
          photo={require('./Solodovnikov.jpg')}
          fullName='Андрей Солодовников'
        />
        <Speaker
          photo={require('./Khashin.jpg')}
          fullName='Евгений Хашин'
        />
        <Speaker
          photo={require('./Muratov.jpg')}
          fullName='Иван Муратов'
        />
      </Container>
      <Text align='center'>
        <Button href='mailto:mark@krddevdays.ru?subject=Хочу выступить на KDD2'>Стать спикером</Button>
      </Text>
    </Section>
  </ThemeProvider>
)
