import styled from 'styled-components'
import Box from '../Box'

const Input = styled(Box).attrs({
  is: 'input',
})`
  box-sizing: border-box;
  border: 3px solid #252525;
  color: #252525;
  background: white;
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  padding: 16px 20px;
  
  &:focus {
     border-width: 6px;
     padding: 13px 17px;
     outline: none;
  }
`

export default Input
