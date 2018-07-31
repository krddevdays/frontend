import firebase from 'firebase/app'
import 'firebase/firestore'

if (typeof window !== 'undefined') {
  require('firebase/auth')
}

const config = {
  projectId: 'krddevdays',
  apiKey: 'AIzaSyCEIlVMjwxH6ubJFOTBsds-IjSnqXAuuU8',
  authDomain: 'krddevdays.firebaseapp.com',
}

firebase.initializeApp(config)

const firestore = firebase.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings)

export {
  firebase,
}
