import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import photosLinks from './list'

const Heading = require('../Heading').withComponent('h3')
const Section = styled(require('../Section'))`
  padding: 1em 0;
`
const Container = styled.div`
  padding: 1rem 0.5rem;
  overflow-x: scroll;
`

const Link = styled.a`
  display: inline-flex;
`

const Photo = styled.img`
  height: 8rem;
  margin-right: 1em;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  user-select: none;
`

export default () => (
  <ThemeProvider theme={{color: 'light'}}>
    <Section>
      <Heading>Как это было в прошлый раз</Heading>
      <Container>
        <Link target='_blank' href='https://vk.com/krddevdays?z=album-131416798_239706151' rel='noopener'>
          {photosLinks.map((photo, index) => (
            <Photo src={require(`./photos/${index + 1}-${photo}`)} key={photo} />
          ))}
        </Link>
      </Container>
    </Section>
  </ThemeProvider>
)
