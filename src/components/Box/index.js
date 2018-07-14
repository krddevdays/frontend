import styled from 'styled-components'
import tag from 'clean-tag'
import {
  display,
  position,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  background,
  height,
  width,
  space,
  color,
  flex,
  order,
  alignSelf,
  boxShadow,
} from 'styled-system'

const Box = styled(tag)`
  box-sizing: border-box;
  ${display}
  ${position}
  ${minWidth}
  ${maxWidth}
  ${minHeight}
  ${maxHeight}
  ${background}
  ${height}
  ${width}
  ${space}
  ${color}
  ${flex}
  ${order}
  ${alignSelf}
  ${boxShadow}
`

export default Box
