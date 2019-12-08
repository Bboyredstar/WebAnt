import React from 'react'
import './App.css'
import Header from './components/Header'
import Images from './components/Images'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

function App() {
  return (
    <Router>
        <div className="App">
          <Header/>
          <Switch>
               <Route exact path="/New">
                  {/* <Images newImages = {true} popularImages = {false} /> */}
                  <Images/>
              </Route>
              <Route exact path="/Popular ">
                  {/* <Images newImages = {false} popularImages = {true} /> */}
                  <Images/>
              </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
