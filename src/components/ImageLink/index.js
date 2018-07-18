import React from 'react'
import styled from 'styled-components'
import {space, width} from 'styled-system'

const ImageLink = styled(({className, src, title, href}) => (
  <a href={href} target='_blank' rel='noopener noreferrer' className={className}>
    <img src={src} title={title} alt={title} />
  </a>
))`
  text-decoration: none;
  ${space}
  
  > img {
    vertical-align: top;
    ${width}
  }
`

export default ImageLink
