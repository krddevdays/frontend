import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Image from '../../Image'

const Footer = styled(require('../Section').withComponent('footer'))`
  display: flex;
  justify-content: center;
`

const Link = styled(require('../Link'))`
  display: inline-block;
  margin: 0 0.5rem;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.7;
  }
`

export default () => (
  <ThemeProvider theme={{color: 'dark'}}>
    <Footer>
      <Link href='https://github.com/krddevdays/krddevdays.ru'>
        <Image src={require('./github.svg')} height='24' />
      </Link>
      <Link href='https://facebook.com/krddevdays'>
        <Image src={require('./facebook.svg')} height='24' />
      </Link>
      <Link href='https://vk.com/krddevdays'>
        <Image src={require('./vk.svg')} height='24' />
      </Link>
    </Footer>
  </ThemeProvider>
)
