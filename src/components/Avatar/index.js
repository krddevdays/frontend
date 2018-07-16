import styled from 'styled-components'
import Box from '../Box'
import Image from 'gatsby-image'

const Avatar = styled(Box.withComponent(Image))`
  vertical-align: top; 
`

Avatar.defaultProps = {
  boxShadow: '-5px 5px 0 #B07EC5',
  width: '40px',
  height: '40px',
}

export default Avatar
