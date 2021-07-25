import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCMZnlLlAdq-mXkdjeB4UwMBA63YIgRp7Q",
    authDomain: "voting-system-9964c.firebaseapp.com",
    projectId: "voting-system-9964c",
    storageBucket: "voting-system-9964c.appspot.com",
    messagingSenderId: "1023443217988",
    appId: "1:1023443217988:web:8ac7859169af9421ee9611"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const firestore = firebase.firestore()

export const createUserDocument = (user, data) => {
    if(!user){
      return
    }

    console.log("user from firebase.js", user)
    
    const userRef = firestore.doc(`users/${user.localId}`)
    // console.log("data from firebase.js", data)
    // console.log("user local id", user.localId)
    
    const snapshot = userRef.get()
    
    if(!snapshot.exists){
const firstName = data.firstName
const lastName = data.lastName
const dateOfBirth = data.dateOfBirth
const regionOfResidence = data.regionOfResidence
const email = data.email
const hasVoted = data.hasVoted
const votedParty = data.votedParty


try {
  userRef.set({
    firstName,
    lastName,
    dateOfBirth,
    regionOfResidence,
    email,
    hasVoted,
    votedParty


  })
} catch (error) {
  console.log("error creating user", error)
}


    }

    // console.log("user ref", userRef)
}