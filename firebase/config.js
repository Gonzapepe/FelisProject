import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyC6AfMAuSNzJy8VEq7Mx4v2nM2A6QWZA5k",
  authDomain: "felisproject-7ec59.firebaseapp.com",
  databaseURL: "https://felisproject-7ec59.firebaseio.com",
  projectId: "felisproject-7ec59",
  storageBucket: "felisproject-7ec59.appspot.com",
  messagingSenderId: "443711585740",
  appId: "1:443711585740:web:29b5cdac198acf9257b169",
  measurementId: "G-GT3PQE0J0W"
};

  export const createUser = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    
    const snapShot = await userRef.get()


    
    if(!snapShot.exists) {
      const { displayName, email } = userAuth
      const createdAt = new Date()

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (err) {
        console.log('error creating user', err.message);
        
      }
    }

    return userRef
  }
  if(!firebase.apps.length){
    firebase.initializeApp(config)
  }
  

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  export const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })

  export default firebase