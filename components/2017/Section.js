import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as colors from './colors'

const background = {
  'light': colors.white,
  'dark': colors.black,
  'gradient': colors.gradient
}

const Section = styled.section`
  display: block;
  flex-shrink: 0;
  flex-grow: 1;
  background: ${props => background[props.color || props.theme.color]};
  padding: 1rem;
  font-size: 0.85em;
`

Section.propTypes = {
  children: PropTypes.any,
  color: PropTypes.oneOf(['dark', 'light', 'gradient'])
}

Section.defaultProps = {
  theme: {
    color: 'dark'
  }
}

export default Section
