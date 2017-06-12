import styled from 'styled-components'

// language=SCSS prefix=dummy{ suffix=}
const Image = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`

export default Image
