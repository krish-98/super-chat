import React from "react"
import "./App.css"
  
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyCw3q4zfUK81ouSjAsMrvj9L3AN_V66mR0",
  authDomain: "superchat-ca9ee.firebaseapp.com",
  projectId: "superchat-ca9ee",
  storageBucket: "superchat-ca9ee.appspot.com",
  messagingSenderId: "21639526042",
  appId: "1:21639526042:web:4dd63cd534fa266863d123",
  measurementId: "G-WQHFEQT7P0"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
  
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header>

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messageRef = firestore.collection("messages")
  const query = messageRef.orderBy("createdAt").limit(25)

  const [messages] = useCollectionData(query, {idField: "id"})

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message

  return <p>{text}</p>
}

export default App
