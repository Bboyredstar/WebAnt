import React from 'react'
import './style.css'
import image from '../../../assets/images/Shape.svg'

const BadConnection = ()=>{
    return(
        <div className="connection">
            <img className="error-logo" src= {image} alt="error-logo"/>
            <span className="error-title">Oh shucks!</span>
            <p className="error-description">Slow or no internet connection.<br/>Please check your internet settings</p>
        </div>
    )
}

export default BadConnection
