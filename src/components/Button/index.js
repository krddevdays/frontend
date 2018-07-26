import styled, {css} from 'styled-components'
import tag from 'clean-tag'
import {flex, space, display, width} from 'styled-system'

const active = css`
  background: #252525;
  color: white;
`

const Button = styled(tag).attrs({
  blacklist: [
    ...tag.defaultProps.blacklist,
    'active',
  ],
})`
  ${display}
  ${space}
  ${flex}
  ${width}
  
  font-size: 18px;
  line-height: 22px;
  font-weight: 900;
  
  text-decoration: none;
  text-align: center;
  
  border: 6px solid #252525;
  background: white;
  color: #252525;
  padding: 13px 27px;
  
  ${props => props.active && active};
  
  &:hover {
    cursor: pointer;
    box-shadow: -10px 10px 0 #B07EC5;
  }
  
  &:focus {
    outline: none;
    box-shadow: -10px 10px 0 #B07EC5;
  }
  
  &:active {
    cursor: pointer;
    ${active};
  }
`

Button.defaultProps = {
  is: 'button',
}

export default Button
