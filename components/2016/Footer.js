import React from 'react'
import styled from 'styled-components'

import Link from './Link'
import Button from './Button'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.footer`
  padding: 20px 0;
  background: #252525;
  font-size: 14px;
  text-align: center;
`

// language=SCSS prefix=dummy{ suffix=}
const Copyright = styled.div`
  display: block;
  line-height: 1.5;
  letter-spacing: 0.05em;
  color: white;
  text-align: center;
`

// language=SCSS prefix=dummy{ suffix=}
const DesignBy = styled.div`
  display: block;
  line-height: 1.5;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
`

export default () => (
  <Container>
    <Button href='https://krddevdays.timepad.ru/event/392666/'>Стать участником</Button>
    <Copyright>© 2016 Krasnodar Dev Days</Copyright>
    <DesignBy>
      Designed by <Link href='http://belashov.tk' target='_blank'>Roman Belashov</Link>
    </DesignBy>
  </Container>
)
