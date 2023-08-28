import firebase from "firebase/compat/app"
import  "firebase/compat/auth"

const app = firebase.initializeApp({
     apiKey: "AIzaSyC93dv6gXXA6wdejvSCnVhfNHKke4y48WY",
  authDomain: "auth-test-3b0b0.firebaseapp.com",
  projectId: "auth-test-3b0b0",
  storageBucket: "auth-test-3b0b0.appspot.com",
  messagingSenderId: "273010055412",
  appId: "1:273010055412:web:5624596507c92dd85f66a1"
})

export const auth  = app.auth();
export default app