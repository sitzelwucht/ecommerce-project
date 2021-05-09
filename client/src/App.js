
import React, { useState, useEffect } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Landing from './components/Landing'
import Home from './components/Home'
import NavBar from './components/NavBar'
import AnonymousNav from './components/AnonymousNav'
import axios from 'axios'
import config from './config'
import Admin from './components/Admin';
import AdminHome from './components/AdminHome';
import ProductsByCategory from './components/ProductsByCategory'
import BrowseCategories from './components/BrowseCategories';
import CartProvider from './contexts/CartProvider'
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Checkout from './components/Checkout';
import FavoriteProvider from './contexts/FavoriteProvider';
import ProductView from './components/ProductView';


function App(props) {
  
  const [loggedInUser, setLoggedInUser] = useState()
  const [error, setError] = useState()
  

  const handleLogin = (e) => {
    e.preventDefault()
    const user = { 
      email: e.target.email.value, 
      password: e.target.password.value }
    
      axios.post(`${config.API_URL}/api/login`, user, {withCredentials: true})
      .then(response => {
        setLoggedInUser(response.data)
        props.history.push('/')
      })
      .catch(err => setError(err.response.data.errorMsg))
}


  const handleAdminLogin = (e) => {
      e.preventDefault()
      const user = {
        email: e.target.email.value,
        password: e.target.password.value,
        isAdmin: e.target.isAdmin.value
      }

      axios.post(`${config.API_URL}/api/admin-login`, user, { withCredentials: true })
      .then(response => {
       setLoggedInUser(response.data)
      })
      .catch(err => setError(err.response.data.errorMsg))
  }



  const handleSignup = (e) => {
    e.preventDefault()
    const newUser = { 
      firstName: e.target.firstName.value, 
      lastName: e.target.lastName.value, 
      email: e.target.email.value, 
      password: e.target.password.value, 
      password2: e.target.password2.value,
      isAdmin: e.target.isAdmin.value 
    }
    axios.post(`${config.API_URL}/api/signup`, newUser)
    .then(response => setLoggedInUser(response.data))
    .catch(err => setError(Object.values(err.response.data)[0]))
  }

  

  const handleLogout = () => {
    axios.post(`${config.API_URL}/api/logout`, {}, { withCredentials: true })
    .then(() => setLoggedInUser(null), () => {props.history.push('/')})
  }



  
  useEffect(() => {
    if (!loggedInUser) {
      axios.get(`${config.API_URL}/api/user`, { withCredentials: true })
      .then(response => setLoggedInUser(response.data))
      .catch(err => console.log(err))
    }
  })



  return (
        
      <CartProvider>
      <FavoriteProvider>
        <>
        {!loggedInUser && <AnonymousNav /> }
        {loggedInUser && !loggedInUser.isAdmin && <NavBar onLogout={handleLogout} user={loggedInUser}/>}
        {loggedInUser && loggedInUser.isAdmin && <NavBar onLogout={handleLogout} user={loggedInUser} admin />}
          <Switch>
            <Route exact path="/" render={() => {
              return <Landing onLogin={handleLogin} onSignup={handleSignup} errorMsg={error} user={loggedInUser} />
            }} />
            
            <Route path="/login" render={(routeProps) => {
              return <LoginForm user={loggedInUser} onLogin={handleLogin} isAdmin="false" errorMsg={props.errorMsg}  />
            }} /> 
            
            <Route path="/signup" render={(routeProps) => {
              return <SignupForm user={loggedInUser} onSignup={handleSignup} isAdmin="false"  errorMsg={props.errorMsg}  />
            }} /> 

            <Route path="/admin" render={() => {
              return <Admin  user={loggedInUser} onLogin={handleAdminLogin} onSignup={handleSignup} errorMsg={error} />
            }} />

            <Route path="/home" render={() => {
              return <Home user={loggedInUser} />
            }} />
            
            <Route path="/adminhome" render={() => {
              return <AdminHome onLogout={handleLogout} user={loggedInUser} />
            }} />

            <Route path="/bycategory/:category" render={(routeProps) => {
              return <ProductsByCategory user={loggedInUser} category={routeProps.match.params.category} />
            }} /> 

            <Route path="/product/:id" render={(routeProps) => {
              return <ProductView user={loggedInUser} id={routeProps.match.params.id} />
            }} /> 

            <Route path="/categories" render={(routeProps) => {
              return <BrowseCategories user={loggedInUser} />
            }} /> 

            <Route path="/checkout" render={(routeProps) => {
              return <Checkout user={loggedInUser} />
            }} /> 
          </Switch>

        </>
        </FavoriteProvider>
      </CartProvider>
  );
}

export default withRouter(App);
