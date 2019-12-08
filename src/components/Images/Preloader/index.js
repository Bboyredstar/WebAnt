import React from 'react'
import './style.css'

const Preloader = () => {
    return(
        <div className = "preloader">
            <span className = "round first"></span>
            <span className = "round second"></span>
            <span className = "round third"></span>
            <span className = "preloader-text">Loading...</span>
        </div>
    )
}

export default Preloader