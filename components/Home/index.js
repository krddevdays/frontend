import React from 'react'
import styled from 'styled-components'
import { createContainer } from '@phenomic/preset-react-app/lib/client'

import Head from '../Head'
import Image from '../Image'

// language=SCSS prefix=dummy{ suffix=}
const Page = styled.div`
  display: flex;
  flex: 0 0 100%;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background: black url(${require('file-loader!./bg.jpg')}) no-repeat center;
`

const Home = () => (
  <Page>
    <Head />
    <Image width='300px' height='133px' src={require('file-loader!./text.svg')} />
  </Page>
)

export default createContainer(Home)
