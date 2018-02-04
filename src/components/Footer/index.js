import React from 'react'
import styled from 'styled-components'

const Container = styled.footer`
  display: flex;
  background: #252525;
  padding: 1rem;
  font-size: 0.85em;
  flex-shrink: 0;
  justify-content: center;
`

const Link = styled.a`
  display: inline-block;
  margin: 0 0.5rem;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.7;
  }
`

export default () => (
  <Container>
    <Link href='https://github.com/krddevdays/krddevdays.ru' target='_blank' rel='noopener'>
      <img src={require('../../images/github.svg')} height='24' alt='GitHub' title='GitHub' />
    </Link>
    <Link href='https://facebook.com/krddevdays' target='_blank' rel='noopener'>
      <img src={require('../../images/facebook.svg')} height='24' alt='Facebook' title='Facebook' />
    </Link>
    <Link href='https://vk.com/krddevdays' target='_blank' rel='noopener'>
      <img src={require('../../images/vk.svg')} height='24' alt='Вконтакте' title='Вконтакте' />
    </Link>
  </Container>
)
