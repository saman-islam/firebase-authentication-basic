import React, { Component } from "react"
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp({
  apiKey:"AIzaSyDBiV4Dp0TLn8xy7jJ5dGPXMfaFY0rDetk",
  authDomain: "authentication-login-20f64.firebaseapp.com"
})
class App extends Component {
  state = { isSignedIn: false}
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () =>false
    }
  }
  componentDidMount = ()=>{
      firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user})
      console.log("user",user)
    })
  }
  render(){
  return (
    <div className="App">
    {this.state.isSignedIn ? (
      <span>
        <div id="signIn">Signed In!</div>
       
        <h1 className="heading">Welcome {firebase.auth().currentUser.displayName}</h1>
        <img
        className="profilephoto"
          alt="profile"
          src={firebase.auth().currentUser.photoURL}
       />
        <button className="signOut" onClick={() => firebase.auth().signOut()}>Sign out!</button>
      </span>
    ) : (
      <StyledFirebaseAuth
        uiConfig={this.uiConfig}
        firebaseAuth={firebase.auth()}
      />
    )}
  </div>
  )
}
}

export default App;

