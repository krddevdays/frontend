import React from 'react'
import styled from 'styled-components'
import { createContainer } from '@phenomic/preset-react-app/lib/client'

import Wrapper from '../Wrapper'
import Image from '../Image'

// language=SCSS prefix=dummy{ suffix=}
const Page = styled.div`
  display: flex;
  flex: 0 0 100%;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background: black url(${require('./bg.jpg')}) no-repeat center;
`

const Home = () => (
  <Wrapper>
    <Page>
      <Image width='300px' height='133px' src={require('./text.svg')} />
    </Page>
  </Wrapper>
)

export default createContainer(Home)
