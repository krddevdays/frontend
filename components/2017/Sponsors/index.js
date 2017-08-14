import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Section from '../Section'
import Text from '../Text'
import Button from '../Button'
import grayscale from '../grayscale'

const Heading = require('../Heading').default.withComponent('h3')

const Sponsor = styled(({className, href, image, name}) => (
  <a className={className} href={href} target='_blank'>
    <img src={image} alt={name} title={name} height='40px' />
  </a>
))`
  ${grayscale}
  
  display: inline-block;
  margin: 1rem 0.5rem;
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
      <Heading>Спонсоры</Heading>
      <Text align='center'>
        <Sponsor
          href='https://www.billing.ru'
          image={require('./peter-service.svg')}
          name='PETER-SERVICE'
        />
      </Text>
      <Text align='center'>
        <Button href={require('./information.pdf')}>Стать спонсором</Button>
      </Text>
    </Section>
  </ThemeProvider>
)
