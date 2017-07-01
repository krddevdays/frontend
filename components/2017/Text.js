import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as colors from './colors'

const color = {
  'light': colors.black,
  'dark': colors.white,
  'gradient': colors.white
}

const Text = styled.p`
  margin: 1rem;
  padding: 0 1rem;
  line-height: 1.25;
  color: ${props => color[props.color || props.theme.color]};
  text-align: ${props => props.align};
`

Text.propTypes = {
  children: PropTypes.any,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  color: PropTypes.oneOf(['dark', 'light'])
}

Text.defaultProps = {
  align: 'left',
  theme: {
    color: 'dark'
  }
}

export default Text
