import React from 'react'
import PropTypes from 'prop-types'

const {Provider, Consumer} = React.createContext({
  user: null,
})

export class FirebaseAuthProvider extends React.Component {
  static propTypes = {
    firebase: PropTypes.any.isRequired,
    children: PropTypes.any,
  }

  state = {
    user: this.props.firebase.auth ? this.props.firebase.auth().currentUser : null,
  }

  unsub = () => void 0

  componentDidMount () {
    const {firebase} = this.props
    const auth = firebase.auth()
    this.unsub = auth.onAuthStateChanged(user => {
      this.setState({user})
    })
  }

  componentWillUnmount () {
    this.unsub()
  }

  render () {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export const FirebaseAuthConsumer = Consumer
