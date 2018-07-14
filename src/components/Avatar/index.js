import styled from 'styled-components'
import Box from '../Box'
import Image from 'gatsby-image'

const Avatar = styled(Box.withComponent(Image))`
  vertical-align: top;
  
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #55E3CA;
    mix-blend-mode: color;
  }
`

Avatar.defaultProps = {
  boxShadow: '-5px 5px 0 #B07EC5',
  width: '40px',
  height: '40px',
}

export default Avatar
