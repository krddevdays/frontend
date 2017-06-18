import React from 'react'
import styled from 'styled-components'

import Section from './Section'

// language=SCSS prefix=dummy{ suffix=}
const Cards = styled.div`
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 480px) {
    flex-wrap: nowrap;
  }

  @media (min-width: 720px) {
    width: 70%;
    margin: 20px auto;
  }

  @media (min-width: 1024px) {
    width: 996px;
    margin: 20px auto;
  }

  @media (orientation: landscape) {
    flex-wrap: nowrap;
  }
`

// language=SCSS prefix=dummy{ suffix=}
const Card = styled.div`
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: white;
  width: 100%;
  height: 100px;

  @media (min-width: 720px) {
    box-shadow: 0 3px 10px 0 rgba(0, 204, 168, 0.3);
    transition: box-shadow 0.2s;
    margin: 0 20px;
    width: calc((100% - 20px * 4) / 3);
    flex-shrink: 0;
    flex-grow: 1;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      box-shadow: 0 3px 20px 0 rgba(0, 204, 168, 0.3);
    }
  }

  @media (min-width: 1024px) {
    font-size: 12.5px;
    height: 160px;
    margin: 0 30px;
    width: calc((100% - 30px * 4) / 3);
  }
`

// language=SCSS prefix=dummy{ suffix=}
const CardTitle = styled.div`
  font-size: 4.2em;
  line-height: 1.2em;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: #26d2b4;
`

// language=SCSS prefix=dummy{ suffix=}
const CardSubtitle = styled.div`
  font-size: 1.6em;
  line-height: 1.2em;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: #7b7b7b;
`

export default () => (
  <Section>
    <Cards>
      <Card>
        <CardTitle>100</CardTitle>
        <CardSubtitle>мест</CardSubtitle>
      </Card>
      <Card>
        <CardTitle>9</CardTitle>
        <CardSubtitle>докладов</CardSubtitle>
      </Card>
      <Card>
        <CardTitle>10</CardTitle>
        <CardSubtitle>декабря</CardSubtitle>
      </Card>
    </Cards>
  </Section>
)
