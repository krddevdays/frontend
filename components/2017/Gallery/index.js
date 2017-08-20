import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import photosLinks from './list'
import Text from '../Text'

const Heading = require('../Heading').default.withComponent('h3')
const Section = styled(require('../Section').default)`
  padding: 1em 0;
`
const Container = styled(Text.withComponent('a'))`
  width: 100%;
  display: block;
  margin: 1rem auto;
  padding: 1rem 0.5rem;
  overflow-x: scroll;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
`

const Photo = styled.img`
  height: 8rem;
  margin-right: 1em;
  cursor: pointer;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
`

export default () => (
  <ThemeProvider theme={{color: 'light'}}>
    <Section>
      <Heading>Как это было в прошлый раз</Heading>
      <Container target='_blank' href='https://vk.com/krddevdays?z=album-131416798_239706151'>
        {photosLinks.map((photo, index) => (
          <Photo src={require(`./photos/${index + 1}-${photo}`)} key={photo} />
        ))}
      </Container>
    </Section>
  </ThemeProvider>
)
