import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as colors from './colors'

const color = {
  'light': colors.black,
  'dark': colors.white,
  'gradient': colors.white
}

const Heading = styled.div`
  display: block;
  font-weight: 300;
  color: ${props => color[props.color || props.theme.color]};
  text-transform: uppercase;
  text-align: center;
  font-size: 1.75rem;
  letter-spacing: 0.1em;
  margin: 1rem 0 calc(1rem + 0.5em);
  padding: 0;
  position: relative;
  
  &:after {
    display: block;
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100px;
    bottom: -0.5em;
    border-bottom: 1px solid ${props => color[props.color || props.theme.color]};
}
`

Heading.propTypes = {
  color: PropTypes.oneOf(['dark', 'light'])
}

Heading.defaultProps = {
  theme: {
    color: 'dark'
  }
}

export default Heading
