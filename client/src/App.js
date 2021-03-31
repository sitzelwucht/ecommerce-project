
import React, { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Landing from './components/Landing'
import axios from 'axios'
import config from './config'

function App() {
  
  const [loggedInUser, setLoggedInUser] = useState()
  const [error, setError] = useState()
  

  const handleLogin = (e) => {
    e.preventDefault()
    const user = { 
      email: e.target.email.value, 
      password: e.target.password.value }
    console.log(user)
}

const handleSignup = (e) => {
  e.preventDefault()
  const newUser = { 
    firstName: e.target.firstName.value, 
    lastName: e.target.lastName.value, 
    email: e.target.email.value, 
    password: e.target.password.value, 
    password2: e.target.password2.value 
  }
  axios.post(`${config.API_URL}/api/signup`, newUser)
  .then(response => setLoggedInUser(response.data))
  .catch(err => setError(err))
}

  return (
    <Landing onLogin={handleLogin} onSignup={handleSignup}/>
  );
}

export default App;
