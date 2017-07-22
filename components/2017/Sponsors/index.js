import React from 'react'
import { ThemeProvider } from 'styled-components'

import Section from '../Section'
import Text from '../Text'
import Button from '../Button'

const Heading = require('../Heading').default.withComponent('h3')

export default () => (
  <ThemeProvider theme={{color: 'dark'}}>
    <Section>
      <Heading>Спонсоры</Heading>
      <Text align='center' />
      <Text align='center'>
        <Button href={require('./information.pdf')}>Стать спонсором</Button>
      </Text>
    </Section>
  </ThemeProvider>
)
