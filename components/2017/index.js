import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Head from '../Head'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

// language=SCSS prefix=dummy{ suffix=}
const Page = styled.div`
  display: flex;
  flex: 1 0 100%;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 10px;
  line-height: 1.15;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
`

export default () => {
  return (
    <Page>
      <Head />
      <Helmet>
        <title>Krasnodar Dev Days #1</title>
        <meta property='og:title' content='Krasnodar Dev Days #1' />
        <link rel='image_src' href={require('./Header/socialVK.png')} />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={require('./Header/socialFB.png')} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image' content={require('./Header/socialVK.png')} />
        <meta property='og:image:width' content='1020' />
        <meta property='og:image:height' content='456' />
        <meta
          property='og:description'
          content='Конференция от разработчиков и для разработчиков. На мероприятие будут затронуты web и mobile направления разработки.' />
      </Helmet>
      <Header />
      <Main />
      <Footer />
    </Page>
  )
}
