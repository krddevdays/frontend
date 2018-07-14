import styled from 'styled-components'
import Box from '../Box'
import {borders, borderColor} from 'styled-system'

const BorderedBox = styled(Box)([],
  borders,
  borderColor,
)

BorderedBox.defaultProps = {
  bg: 'white',
  border: '6px solid',
  borderColor: '#252525',
}

export default BorderedBox
