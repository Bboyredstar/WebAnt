import React from 'react';
import './style.css';
import logo from './logo.png'
import { Divider } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
  

const Header = ()=>{
    return(
        <header className= "header">
            <img src={logo} alt="header-logo" className="header-logo"/>
            {/* <Router> */}
                <nav className='navigation'>
                    <a className="navigation-links">
                        New
                        {/* <Link to='/showNewImages'>New</Link> */}
                    </a>
                    <a className="navigation-links">
                        Popular
                        {/* <Link to='/showPopularImages'>Popular</Link> */}
                    </a>
                </nav>
                {/* <Switch>
                    <Route path='/showNewImages'>
                        <ShowImages showNew={true}/>
                    </Route>
                    <Route path='/showNewImages'>
                        <ShowImages showNew={false}/>
                    </Route>
                </Switch>
            </Router> */}
            {/* <span>Sign in</span> */}
        </header>
    );
}

export default Header;