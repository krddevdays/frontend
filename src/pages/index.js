import React from 'react'
import Helmet from 'react-helmet'
import url from 'url'

import Wrapper from '../components/Wrapper'
import Header from '../components/2017/Header'
import Info from '../components/2017/Info'
import Gallery from '../components/2017/Gallery'
import Lectures from '../components/2017/Lectures'
import Partners from '../components/2017/Partners'
import Sponsors from '../components/2017/Sponsors'
import Footer from '../components/2017/Footer'

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
        content={url.resolve('https://krddevdays.ru', require('../components/2017/og.png'))}
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
