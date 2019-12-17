import React from 'react'
import logo from '../../assets/images/logo.png'
import  { NavLink }   from 'react-router-dom'
import './style.css'

const Header = ()=>{    
    return(
        <header className= 'header'>
            <img src={logo} alt='header-logo' className='header-logo'/>
                <nav className='navigation'>
                    <NavLink to='/new' className='navigation-links' activeClassName='active'>
                        New
                    </NavLink>
                    <NavLink to='/popular' className='navigation-links' activeClassName='active'>
                        Popular
                    </NavLink>
                    <NavLink to='/authentification' className='authentification-link' activeClassName=''>
                        <img src='https://img.icons8.com/wired/64/000000/user-credentials.png' alt='auth-logo' className='auth-logo' title='Sign In'/> 
                    </NavLink>
                </nav>
               
        </header>
    );
}

export default Header