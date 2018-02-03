import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Section from './Section'

const Card = styled(({className, title, subtitle}) => (
  <div className={className}>
    <div className='title'>{title}</div>
    <div className='subtitle'>{subtitle}</div>
  </div>
))`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 50%;
  color: white;
  
  > .title {
    font-size: 2.4rem;
    font-weight: 600;
  }
  
  > .subtitle {
    font-size: 1.2rem;
    font-weight: 400;
  }
`

const Cards = styled.div`
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  
  > ${Card} {
    margin-bottom: 10px;
  }
  
  @media (min-width: 580px) {
    flex-wrap: nowrap;
 
    > ${Card} {
      margin-bottom: 0;
    }
  }
  
  @media (min-width: 768px) {
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (orientation: landscape) {
    flex-wrap: nowrap;
  }
`

export default () => (
  <ThemeProvider theme={{color: 'dark'}}>
    <Section>
      <Cards>
        <Card title='200' subtitle='участников' />
        <Card title='10' subtitle='докладов' />
        <Card title='750' subtitle='рублей за билет' />
        <Card title='17' subtitle='сентября' />
      </Cards>
    </Section>
  </ThemeProvider>
)
