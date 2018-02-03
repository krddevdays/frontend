import PropTypes from 'prop-types'
import styled from 'styled-components'

const Link = styled.a`
  color: #26d2b4;
  transition: color 0.2s;

  &:hover {
    color: #27bfa0;
  }
`

Link.propTypes = {
  href: PropTypes.string.isRequired,
  target: PropTypes.oneOf(['_blank', '_self'])
}

export default Link
