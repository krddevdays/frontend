import styled from 'styled-components'
import Box from '../Box'
import {flexWrap, flexDirection, alignItems, justifyContent} from 'styled-system'

const Flex = styled(Box)`
  display: flex;
  ${flexWrap}
  ${flexDirection}
  ${alignItems}
  ${justifyContent}
`

export default Flex
