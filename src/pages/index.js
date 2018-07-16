import React from 'react'
import {graphql} from 'gatsby'
import Image from 'gatsby-image'
import {ThemeProvider} from 'styled-components'

import Layout from '../components/Layout'
import Flex from '../components/Flex'
import Box from '../components/Box'
import Container from '../components/Container'
import Heading from '../components/Heading'
import BorderedBox from '../components/BorderedBox'
import Text from '../components/Text'
import styled from 'styled-components'
import tag from 'clean-tag'
import Button from '../components/Button'
import Avatar from '../components/Avatar'

const Shadow = styled(tag)`
  position: relative;
  min-height: ${props => 214 + (parseInt(props.top) < 0 ? parseInt(props.top) : 0) + (!props.top && parseInt(props.bottom) < 0 ? parseInt(props.bottom) : 0)}px;
  ${props => props.top && parseInt(props.top) < 0 && `
    margin-top: ${-parseInt(props.top)}px;
  `}
  ${props => !props.top && props.bottom && parseInt(props.bottom) < 0 && `
    margin-bottom: ${-parseInt(props.bottom)}px;
  `}
  
  &:before {
    ${props => props.top && `top: ${props.top};`}
    ${props => props.right && `right: ${props.right};`}
    ${props => props.bottom && `bottom: ${props.bottom};`}
    ${props => props.left && `left: ${props.left};`}
    content: '';
    display: block;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='415' height='214'%3E%3Cpath fill='${props => encodeURIComponent(props.color)}' fill-rule='nonzero' d='M5.6 11.21l5.6-5.6L5.6 0 0 5.6l5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zM28.02 11.21l5.6-5.6L28.02 0l-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zM50.43 11.21l5.6-5.6L50.44 0l-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zM72.85 11.21l5.6-5.6L72.85 0l-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zM95.26 11.21l5.6-5.6L95.27 0l-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22.42-201.79l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22.41-201.79l5.6-5.6L140.1 0l-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22.42-201.79l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22.41-201.79l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22.42-201.79l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22.41-201.79l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22-201l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22-201l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm23-201l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22-201l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm23-201l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22-201l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22-201l5.61-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.61-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm23-201l5.61-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.61-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6z' opacity='.4'/%3E%3C/svg%3E") no-repeat;
    position: absolute;
    width: 415px;
    height: 214px;
    z-index: -1;
  }
`

Shadow.defaultProps = {
  color: '#B07EC5',
}

const topics = [
  {
    lecturer: {
      name: 'Денис Сальников',
      company: 'N26',
      gender: 'male',
    },
    lecture: 'Объясняем Scrum: История эволюции одной команды',
  },
  {
    lecturer: {
      name: 'Дмитрий Кунин',
      company: 'Avito',
      gender: 'male',
    },
    lecture: 'Dat протокол ⏤ общие понятия, инструменты, применение',
  },
  {
    lecturer: {
      name: 'Алина Савченко',
      gender: 'female',
    },
    lecture: 'Суровая жизнь тестировщика игр',
  },
]

const IndexPage = ({data}) => (
  <ThemeProvider theme={{
    breakpoints: ['375px', '438px', '568px', '639px', '768px', '1024px', '1170px'],
  }}>
    <Layout>
      <Box position='relative' minHeight={`${data.backgroundFirst.childImageSharp.fixed.height}px`}>
        <Image
          fixed={data.backgroundFirst.childImageSharp.fixed}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            background: 'white',
            maxHeight: `${data.backgroundFirst.childImageSharp.fixed.height}px`,
          }}
        />
        <Container>
          <Flex
            justifyContent={[, , , , , , 'space-between']}
            flexDirection={['column', , , , , , 'row']}
            pt={[, , , , , , '120px']}
            alignItems={[, , , , , , 'flex-start']}
          >
            <Box mt={['40px', , , , , , '0px']}>
              <Shadow top='-40px' left='-200px'>
                <Heading
                  is='h1'
                  maxWidth={[, , , , '620px']}
                  fontSize={['27px', '33px', '39px', '48px']}
                  lineHeight={['40px', '48px', '57px', '70px']}
                  letterSpacing='0.125em'
                  fontWeight='900'
                >
                  Ежегодная конференция разработчиков Краснодара и края
                </Heading>
              </Shadow>
            </Box>
            <Flex flexDirection='column' alignItems={[, , , , , , 'flex-end']}>
              <BorderedBox flex={[, , , , , , '0 0 auto']} p='20px' boxShadow='-10px 10px 0 #B07EC5'
                           mt={['40px', , , , , , '0px']}>
                <Text
                  fontSize={['28px', '34px']}
                  letterSpacing='0.125em'
                  lineHeight={['36px', '44px']}
                  fontWeight='900'
                  maxWidth={[, , , , , , '280px']}
                >
                  Krasnodar Dev Days #3
                </Text>
                {['15 сентября', 'ул. Трамвайная 2/6'].map((content, key) => (
                  <Flex alignItems='center' mt='20px' key={key}>
                    <Box display={['none', , , 'block']} mr='30px' bg='#252525' height='3px' flex='0 0 60px'
                         width='60px' />
                    <Text
                      fontSize={['24px']}
                      lineHeight={['29px']}
                      fontWeight='900'
                    >
                      {content}
                    </Text>
                  </Flex>
                ))}
              </BorderedBox>
              <Button
                display={['none', , , , , , 'block']}
                is='a'
                href='https://krddevdays.timepad.ru/event/763050/'
                target='_blank'
                mt='80px'
              >
                Купить билет
              </Button>
            </Flex>
          </Flex>
          <BorderedBox p='10px 20px' mt='40px'>
            <Flex
              justifyContent={[, , , , , 'space-between']}
              flexWrap='wrap'
            >
              {
                [
                  {
                    title: '2 потока',
                    description: '// каждый найдет доклад по интересам',
                  },
                  {
                    title: 'круглый стол',
                    description: '// открытые дискуссии на любые темы',
                  },
                  {
                    title: '350 участников',
                    description: '// прекрасная возможность найти единомышленников',
                  },
                ].map(({title, description}, key) => (
                  <Flex flexDirection='column' width={[, , , , , '49%', '33%']} key={key} my='10px'>
                    <Flex alignItems='center'>
                      <Box display={['none', , , 'block']} mr='30px' bg='#252525' height='3px' flex='0 0 60px'
                           width='60px' />
                      <Text
                        fontSize={['24px']}
                        lineHeight={['29px']}
                        fontWeight='900'
                      >
                        {title}
                      </Text>
                    </Flex>
                    <Text
                      fontSize='16px'
                      lineHeight='22px'
                      fontWeight='500'
                      mt='20px'
                    >
                      {description}
                    </Text>
                  </Flex>
                ))
              }
            </Flex>
          </BorderedBox>
          <Button
            display={['inline-block', , , , , , 'none']}
            is='a'
            href='https://krddevdays.timepad.ru/event/763050/'
            target='_blank'
            mt='40px'
          >
            Купить билет
          </Button>
        </Container>
        <Container>
          <Flex
            justifyContent={['flex-start', , , , , 'space-between']}
            flexDirection={['column', , , , , 'row']}
            mt={['80px']}
            alignItems={[, , , , , 'flex-start']}
          >
            <Box>
              <Shadow top='-40px' left='-200px'>
                <Heading
                  is='h2'
                  fontSize={['27px', '33px', '39px', '48px']}
                  lineHeight={['40px', '48px', '57px', '70px']}
                  letterSpacing='0.125em'
                  fontWeight='900'
                  mb='40px'
                >
                  Доклады
                </Heading>
                <Text
                  fontSize={['24px', , '28px']}
                  lineHeight={['30px', , '34px']}
                  fontWeight='500'
                >
                  Список дополняется
                </Text>
              </Shadow>
            </Box>
            <Button
              is='a'
              href='https://connect.yandex.ru/forms/5adc61cf6162d77e2714831c/'
              target='_blank'
              mt={['20px', , , , , '40px']}
            >
              Подать заявку на выступление
            </Button>
          </Flex>
          <Flex
            justifyContent={['stretch', , , , , 'space-between']}
            flexWrap='wrap'
            mt='40px'
          >
            {topics.map(({lecture, lecturer}, key) => (
              lecture &&
              <BorderedBox
                key={key}
                width={['100%', , , , , '48%', '32%']}
                mb='40px'
              >
                <Flex flexDirection='column'>
                  <Text
                    height={[, , , , , `${37 * 4}px`, , `${37 * 3}px`]}
                    px='14px'
                    mt='14px'
                    fontSize='24px'
                    lineHeight='37px'
                    fontWeight='900'
                  >
                    {lecture}
                  </Text>
                  <Flex my='14px' mx='14px' alignItems='flex-start'>
                    <Avatar
                      fixed={data[`noAvatar${lecturer.gender.slice(0, 1).toUpperCase()}${lecturer.gender.slice(1)}`].childImageSharp.fixed}
                      mr='20px'
                    />
                    <Box alignSelf='center'>
                      <Flex flexDirection='column'>
                        <Text
                          fontSize='18px'
                          lineHeight='22px'
                          fontWeight='500'
                        >
                          {lecturer.name}
                        </Text>
                        {
                          lecturer.company &&
                          <Text
                            mt='5px'
                            fontSize='16px'
                            lineHeight='19px'
                            fontWeight='400'
                          >
                            {lecturer.company}
                          </Text>
                        }
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
              </BorderedBox>
            ))}
          </Flex>
        </Container>
      </Box>
      <Box position='relative' minHeight={`${data.backgroundSecond.childImageSharp.fixed.height}px`}>
        <Image
          fixed={data.backgroundSecond.childImageSharp.fixed}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            background: 'white',
            maxHeight: `${data.backgroundSecond.childImageSharp.fixed.height}px`,
          }}
        />
        <Container>
          <Flex
            justifyContent={['flex-start', , , , , , 'space-between']}
            flexDirection={['column', , , , , , 'row']}
            mt={['80px']}
          >
            <Box>
              <Shadow top='-40px' left='-200px'>
                <Heading
                  is='h2'
                  fontSize={['27px', '33px', '39px', '48px']}
                  lineHeight={['40px', '48px', '57px', '70px']}
                  letterSpacing='0.125em'
                  fontWeight='900'
                  mb='40px'
                >
                  Круглый стол
                </Heading>
                <Flex>
                  <Text
                    fontSize={['24px', , '28px']}
                    lineHeight={['30px', , '34px']}
                    fontWeight='500'
                  >
                    Подача тем откроется до конца июля
                  </Text>
                </Flex>
              </Shadow>
            </Box>
            <Box display={['none', , , , , , 'block']}>
              <Box mr='20px' mt='20px' width='70px' bg='#252525' height='3px' style={{float: 'left'}} />
              <Text
                fontSize={['28px']}
                lineHeight={['44px']}
                fontWeight='500'
              >
                Подай тему,<br />
                найди единомышленников,<br />
                собери свой круглый стол.
              </Text>
            </Box>
          </Flex>
        </Container>
        <Container>
          <Flex mt={['80px']}>
            <Box>
              <Shadow color='#55E3CA' top='-40px' left='-200px'>
                <Heading
                  is='h2'
                  fontSize={['27px', '33px', '39px', '48px']}
                  lineHeight={['40px', '48px', '57px', '70px']}
                  letterSpacing='0.125em'
                  fontWeight='900'
                >
                  Сколько стоит билет?
                </Heading>
              </Shadow>
            </Box>
          </Flex>
          <Flex mt='40px' justifyContent='space-between' flexWrap='wrap'>
            {
              [
                {
                  title: 'Ранняя пташка',
                  price: '1500 ₽',
                  description: '// 50 билетов',
                },
                {
                  title: 'Всё вовремя',
                  price: '2000 ₽',
                  description: '// 200 билетов',
                },
                {
                  title: 'Я все проспал',
                  price: '2500 ₽',
                },
              ].map(({title, price, description}, key) => (
                <Flex key={key} width={[1, , , , , 1 / 2, 1 / 3]} maxWidth={[]}
                      flexDirection='column' py='40px' px='10px'>
                  <Text
                    fontSize='48px'
                    lineHeight='58px'
                    letterSpacing='0.125em'
                    fontWeight='500'
                  >
                    {price}
                  </Text>
                  <Text
                    mt={['10px', , , , , '40px']}
                    fontSize='32px'
                    lineHeight='39px'
                    letterSpacing='0.125em'
                    fontWeight='900'
                  >
                    {title}
                  </Text>
                  {
                    description &&
                    <Text
                      mt='20px'
                      fontSize='24px'
                      lineHeight='30px'
                      letterSpacing='0.125em'
                      fontWeight='700'
                    >
                      {description}
                    </Text>
                  }
                </Flex>
              ))
            }
          </Flex>
          <Flex flexDirection='column'>
            <Text
              fontSize={['24px']}
              lineHeight={['34px']}
              fontWeight='500'
            >
              Билеты ничем не отличаются, кроме цены и количества.<br />
              Вы можете купить любой билет на ваше усмотрение.
            </Text>
          </Flex>
          <Flex>
            <Button
              is='a'
              href='https://krddevdays.timepad.ru/event/763050/'
              target='_blank'
              mt='80px'
            >
              Купить билет
            </Button>
          </Flex>
        </Container>
        <Container>
          <Flex mt={['80px']}>
            <Box>
              <Shadow top='-40px' left='-200px' color='#55E3CA'>
                <Heading
                  is='h2'
                  fontSize={['27px', '33px', '39px', '48px']}
                  lineHeight={['40px', '48px', '57px', '70px']}
                  letterSpacing='0.125em'
                  fontWeight='900'
                >
                  Как это было в прошлом году
                </Heading>
              </Shadow>
            </Box>
          </Flex>
          <Flex mt='40px'
                flexDirection='column'
                flexWrap='wrap'
          >
            <Box height={0} pb='56.25%' position='relative'>
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                title='Видео Krasnodar Dev Days #2'
                width="560"
                height="315"
                src="https://www.youtube.com/embed/_YUUlmSZYuc?rel=0&amp;showinfo=0"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </Box>
          </Flex>
        </Container>
        <Container>
          <Flex mt={['80px']}>
            <Box>
              <Shadow top='-40px' left='-200px'>
                <Heading
                  is='h2'
                  fontSize={['27px', '33px', '39px', '48px']}
                  lineHeight={['40px', '48px', '57px', '70px']}
                  letterSpacing='0.125em'
                  fontWeight='900'
                >
                  Остались вопросы?
                </Heading>
              </Shadow>
            </Box>
          </Flex>
          <Flex mt='40px'
                alignItems={[, , , , , 'center']}
                flexDirection='column'
                flexWrap='wrap'
          >
            <Text
              is='a'
              href='tel:+79183628576'
              fontSize={['20px', '24px', '30px', '38px']}
              lineHeight={['40px', '48px', '60px', '70px']}
              letterSpacing='0.125em'
              fontWeight='500'
            >
              +7 (918) 362-85-76
            </Text>
            <Text
              is='a'
              href='mailto:help@krddevdays.ru'
              fontSize={['20px', '24px', '30px', '38px']}
              lineHeight={['40px', '48px', '60px', '70px']}
              letterSpacing='0.125em'
              fontWeight='500'
            >
              help@krddevdays.ru
            </Text>
          </Flex>
        </Container>
      </Box>
      <Box bg='#FAFAFA' mt='40px'>
        <Container>
          <Flex height='150px' alignItems='center'>
            <Text
              fontSize='18px'
              lineHeight='22px'
              fontWeight={500}
            >
              Krasnodar Dev Days © 2018
            </Text>
          </Flex>
        </Container>
      </Box>
    </Layout>
  </ThemeProvider>
)

export default IndexPage

export const pageQuery = graphql`
    query Image {
        backgroundFirst: file(absolutePath: {regex: "/src\/pages\/background-first.png$/"}) {
            childImageSharp {
                fixed(width:1680) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        backgroundSecond: file(absolutePath: {regex: "/src\/pages\/background-second.png$/"}) {
            childImageSharp {
                fixed(width:1680) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        noAvatarMale: file(absolutePath: {regex: "/src\/pages\/no-avatar-male.jpg$/"}) {
            childImageSharp {
                fixed(width:40,height:40) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        noAvatarFemale: file(absolutePath: {regex: "/src\/pages\/no-avatar-female.jpg/"}) {
            childImageSharp {
                fixed(width:40,height:40) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
    }
`
