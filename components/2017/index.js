import React from 'react'
import url from 'url'

import Head from '../Head'
import Header from './Header'
import Lectures from './Lectures'
import Partners from './Partners'
import Sponsors from './Sponsors'
import Footer from './Footer'

const Landing = props => (
  [
    <Head key='head'>
      <title>Krasnodar Dev Days #2</title>
      <meta
        property='og:description'
        content='Вторая full-day конференция разработчиков в Краснодаре. Front-end, Back-end, Mobile, DevOps'
      />
      <meta
        property='og:image'
        content={url.resolve('https://krddevdays.ru', require('./og.png'))}
      />
    </Head>,
    <Header key='header' />,
    <Lectures key='lectures' />,
    <Partners key='partners' />,
    <Sponsors key='sponsors' />,
    <Footer key='footer' />
  ]
)

export default Landing
