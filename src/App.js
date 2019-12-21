import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Images from './components/Images'
import Authentification from './components/Authentification'
import Registration from './components/Authentification/Registration'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

function App() {
  const [isAuthorized,setAuthorization] = useState(false)
  useEffect(()=>{
      if(!!sessionStorage.getItem('Authorized')){
        setAuthorization(true)
      }
  },[isAuthorized])
  
  return (
      <Router>
          <div>
            <Header/>
            <Switch>
                <Route exact path='/new'>
                  <Images New/>  
                </Route>
                <Route path='/popular'>
                  <Images Popular/>
                </Route>
                <Route path='/authentification'>
                  <Authentification isAuthorized />
                </Route>
                <Route path='/registration'>
                  <Authentification registration isAuthorized />
                </Route>
                <Redirect to='/new'/>
            </Switch>
          </div>
      </Router>
  );
}

export default App;
