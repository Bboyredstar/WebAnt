import React from 'react'
import './style.css'
import logo from '../../assets/images/logo.png'
import { NavLink } from "react-router-dom"
  

const Header = ()=>{
    return(
        <header className= "header">
            <img src={logo} alt="header-logo" className="header-logo"/>
                <nav className='navigation'>
                    <NavLink to='/new' className="navigation-links" activeClassName="navigation-links active">
                        New
                    </NavLink>
                    <NavLink to='/popular' className="navigation-links" activeClassName="navigation-links active">
                        Popular
                    </NavLink>
                </nav>
        </header>
    );
}

export default Header