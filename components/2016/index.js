import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Head from '../Head'

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

// language=SCSS prefix=dummy{ suffix=}
const Section = styled.div`
  padding: 20px 0;
  display: flex;
  background: white;
  color: black;
  box-sizing: border-box;
`

// language=SCSS prefix=dummy{ suffix=}
const FullScreenSection = Section.extend`
  padding: 10px 0;
  min-height: 100vh;
  justify-content: center;
  background: black url(${require('./bg.jpg')}) bottom no-repeat;
  background-size: cover;
  flex-direction: row;
  flex-wrap: wrap;
  color: #fff;
  font-size: 10px;
`

// language=SCSS prefix=dummy{ suffix=}
const Logo = styled.img`
  vertical-align: top;
  width: 180px;
  height: 196px;

  @media (min-width: 720px) {
    width: 189px;
    height: 205px;
  }
`

// language=SCSS prefix=dummy{ suffix=}
const LogoWrapper = styled.h1`
  font-size: 10px;
  margin: 10px 0;
  order: 2;
  text-align: center;
  width: 100%;
  align-self: center;
`

// language=SCSS prefix=dummy{ suffix=}
const PageTitle = styled.div`
  order: 3;
  text-transform: uppercase;
  font-size: 1.4em;
  line-height: 2em;
  letter-spacing: 0.1em;
  font-weight: 300;
  text-align: center;
  margin: 10px 0;
  width: 100%;
  align-self: flex-end;

  @media (min-width: 720px) {
    font-size: 1.8em;
  }
`

// language=SCSS prefix=dummy{ suffix=}
const Highlight = styled.span`
  color: #d571ff;
`

// language=SCSS prefix=dummy{ suffix=}
const SocialLinks = styled.div`
  width: 100%;
  order: 6;
  margin: 10px auto;
  text-align: center;
  align-self: flex-end;

  @media (min-width: 720px) {
    order: 1;
    width: 70%;
    text-align: right;
    align-self: flex-start;
  }

  @media (min-width: 1024px) {
    width: 996px;
  }
`

// language=SCSS prefix=dummy{ suffix=}
const Link = styled.a`
  color: #26d2b4;
  transition: color 0.2s;
  letter-spacing: 0.05em;
`

// language=SCSS prefix=dummy{ suffix=}
const SocialLink = Link.extend`
  display: inline-block;
  text-decoration: none;
  margin: 0 1.5em;
  vertical-align: middle;
  transition: opacity .2s;
  
  &:hover {
    opacity: 0.7;
  }

  &:last-child {
    margin-right: 0;
  }
`

// language=SCSS prefix=dummy{ suffix=}
const Subjects = styled.ol`
  order: 4;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style: none;
  text-transform: uppercase;
  font-size: 2.4em;
  letter-spacing: 0.1em;
  font-weight: 700;
  line-height: 1.5em;
  margin: 20px 0;
  padding: 0;
  width: 100%;
  align-self: center;

  @media (min-width: 568px) {
    flex-wrap: nowrap;
    flex-direction: row;
  }

  @media (min-width: 720px) {
    font-size: 2.8em;
  }
`

// language=SCSS prefix=dummy{ suffix=}
const Subject = styled.li`
  @media (min-width: 568px) {
    margin: 0 1em;
  }
`

// language=SCSS prefix=dummy{ suffix=}
const Button = Link.extend`
  display: flex;
  margin: 20px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: .05em;
  text-transform: uppercase;
  line-height: 1.5;
  box-sizing: border-box;
  padding: 1em 2em;
  border-radius: 5px;
  color: #fff;
  text-decoration: none;
  justify-content: center;
  align-content: center;
  align-items: center;
  background: #26d2b4;
  box-shadow: 0 2px 30px 0 rgba(38,210,180,.4);
  transition: box-shadow .2s;
  
  @media (min-width: 480px) {
    display: inline-block;
  }
  
  &:hover {
    box-shadow: 0 2px 60px 0 rgba(38,210,180,.4)
  }
`

// language=SCSS prefix=dummy{ suffix=}
const ButtonHeader = Button.extend`
  order: 5;
  margin: 10px auto;
  text-align: center;
  align-self: center;

  @media (min-width: 720px) {
    align-self: flex-end;
  }
`

export default () => {
  return (
    <Page>
      <Head />
      <Helmet>
        <title>Krasnodar Dev Days #1</title>
        <meta property='og:title' content='Krasnodar Dev Days #1' />
        <link rel='image_src' href={require('./socialVK.png')} />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={require('./socialFB.png')} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image' content={require('./socialVK.png')} />
        <meta property='og:image:width' content='1020' />
        <meta property='og:image:height' content='456' />
        <meta
          property='og:description'
          content='Конференция от разработчиков и для разработчиков. На мероприятие будут затронуты web и mobile направления разработки.' />
      </Helmet>
      <FullScreenSection>
        <LogoWrapper>
          <Logo
            src={require('./logo.png')}
            srcSet={`${require('./logo@2x.png')} 2x, ${require('./logo@3x.png')} 3x`}
            title='Krasnodar Dev Days'
            alt='Krasnodar Dev Days' />
        </LogoWrapper>
        <PageTitle>
          Конференция разработчиков<br />
          <Highlight>10 декабря</Highlight>, Красноармейская 55/1
        </PageTitle>
        <Subjects>
          <Subject>Front-end</Subject>
          <Subject>Back-end</Subject>
          <Subject>Mobile</Subject>
        </Subjects>
        <ButtonHeader href='https://krddevdays.timepad.ru/event/392666/'>Стать участником</ButtonHeader>
        <SocialLinks>
          <SocialLink href='https://www.facebook.com/krddevdays/' target='_blank'>
            <img
              src={require('./facebook.png')}
              srcSet={`${require('./facebook@2x.png')} 2x, ${require('./facebook@3x.png')} 3x`}
              height='28px'
              width='15px' />
          </SocialLink>
          <SocialLink href='https://vk.com/krddevdays' target='_blank'>
            <img
              src={require('./vk.png')}
              srcSet={`${require('./vk@2x.png')} 2x, ${require('./vk@3x.png')} 3x`}
              height='18px'
              width='32px' />
          </SocialLink>
        </SocialLinks>
      </FullScreenSection>
    </Page>
  )
}
