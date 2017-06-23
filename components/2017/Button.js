import Link from './Link'

// language=SCSS prefix=dummy{ suffix=}
export default Link.extend`
  display: flex;
  margin: 20px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: .05em;
  text-transform: uppercase;
  line-height: 1.5;
  box-sizing: border-box;
  padding: 1em 2em;
  border-radius: 5px;
  color: #fff;
  text-decoration: none;
  justify-content: center;
  align-content: center;
  align-items: center;
  background: #26d2b4;
  box-shadow: 0 2px 30px 0 rgba(38,210,180,.4);
  transition: box-shadow .2s;

  @media (min-width: 480px) {
    display: inline-block;
  }

  &:hover {
    box-shadow: 0 2px 60px 0 rgba(38,210,180,.4)
  }
`
