import styled from 'styled-components'
import {fontSize, fontWeight, letterSpacing, lineHeight} from 'styled-system'
import Box from '../Box'

const Text = styled(Box)([],
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
)

Text.defaultProps = {
  color: '#252525',
}

export default Text
