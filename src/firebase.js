import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  projectId: 'krddevdays'
}

firebase.initializeApp(config)

const firestore = firebase.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings)

export {
  firebase,
}
