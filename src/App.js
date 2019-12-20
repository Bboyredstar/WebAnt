import React from 'react'
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
                <Authentification/>
              </Route>
              <Route path='/registration'>
                <Registration/>
              </Route>
              <Redirect to='/new'/>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
