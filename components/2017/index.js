import React from 'react'
import Helmet from 'react-helmet'
import url from 'url'

import Wrapper from '../Wrapper'
import Header from './Header'
import Info from './Info'
import Gallery from './Gallery'
import Lectures from './Lectures'
import Partners from './Partners'
import Sponsors from './Sponsors'
import Footer from './Footer'

const Landing2017 = (props) => (
  <Wrapper>
    <Helmet>
      <title>Krasnodar Dev Days #2</title>
      <meta
        property='og:description'
        content='Вторая full-day конференция разработчиков в Краснодаре. Front-end, Back-end, Mobile, DevOps'
      />
      <meta
        property='og:image'
        content={url.resolve('https://krddevdays.ru', require('./og.png'))}
      />
    </Helmet>
    <Header />
    <Info />
    <Gallery />
    <Lectures />
    <Partners />
    <Sponsors />
    <Footer />
  </Wrapper>
)

export default Landing2017
