import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as colors from './colors'

const color = {
  'light': colors.white,
  'dark': colors.black,
  'gradient': colors.white
}

const background = {
  'light': colors.black,
  'dark': colors.white,
  'gradient': colors.gradient
}

const Button = styled.a`
  white-space: nowrap;
  display: ${props => props.fluid ? 'block' : 'inline-block'};
  width: ${props => props.fluid ? '100%' : 'auto'};
  min-height: 2.5em;
  line-height: 2.5;
  margin: 0 0.5rem;
  padding: 0 0.875em;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background: ${props => background[props.color || props.theme.color]};
  border-radius: 0.25em;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${props => color[props.color || props.theme.color]};
  text-decoration: none;
  transition: box-shadow 0.15s ease, transform 0.15s ease;
  will-change: transform;
  user-select: none;

  &:hover {
    transform: translate3d(0, -1px, 0);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`

Button.propTypes = {
  color: PropTypes.oneOf(['dark', 'light', 'gradient'])
}

Button.defaultProps = {
  theme: {
    color: 'dark'
  }
}

export default Button
